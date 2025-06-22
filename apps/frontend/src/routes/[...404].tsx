/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { Title } from '@solidjs/meta'
import { HttpStatusCode } from '@solidjs/start'

export default function NotFound() {
  return (
    <main>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Page Not Found</h1>
      <p>
        Visit
        {' '}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>
        {' '}
        to learn how to build SolidStart apps.
      </p>
    </main>
  )
}
