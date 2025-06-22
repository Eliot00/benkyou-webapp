/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { magicLink } from 'better-auth/plugins'
import { Resend } from 'resend'

import { createDrizzleClient } from '../drizzle'
import { betterAuthOptions, drizzleAdapterConfig } from './options'

export function auth(env: CloudflareBindings): ReturnType<typeof betterAuth> {
  const db = createDrizzleClient(env)

  return betterAuth({
    ...betterAuthOptions,
    database: drizzleAdapter(db, drizzleAdapterConfig),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRENT,
      },
    },
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          const resend = new Resend(env.SENDER_API_KEY)
          await resend.emails.send({
            from: 'Benkyou <noreply@auth.benkyou.fun>',
            to: email,
            subject: 'Magic Link',
            html: `Click the link to login into your account: ${url}`,
          })
        },
      }),
    ],
  })
}
