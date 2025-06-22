/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { AppEnv } from './env'
import { Hono } from 'hono'
import { except } from 'hono/combine'
import { HTTPException } from 'hono/http-exception'
import { auth } from './lib/better-auth'
import words from './routes/words'

const app = new Hono<AppEnv>().basePath('/api')

app.on(['GET', 'POST'], '/auth/*', (c) => {
  return auth(c.env).handler(c.req.raw)
})

app.use(except('/auth/*', async (c, next) => {
  const session = await auth(c.env).api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    throw new HTTPException(401, { message: 'Unauth' })
  }

  c.set('user', session.user)
  c.set('session', session.session)

  await next()
}))

app.route('/words', words)

export type AppType = typeof app
export default app
