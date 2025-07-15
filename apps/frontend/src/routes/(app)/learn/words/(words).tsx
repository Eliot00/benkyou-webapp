/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { A } from '@solidjs/router'
import { createResource, Show, Switch, Match } from 'solid-js'
import { getLearningPreview } from '~/services/words'

export default function WordsPage() {
  const [preview] = createResource(getLearningPreview)

  return (
    <div class="h-full w-full flex items-center justify-center gap-6">
      <Show when={preview.loading}>
        <p>loading...</p>
      </Show>
      <Switch>
        <Match when={preview.error}>
          <span>Error</span>
        </Match>
        <Match when={preview()}>
          <A href="/learn/words/new">
            <div class="hover:underline">
              👉新学
              <span>
                {preview()?.new}
              </span>
            </div>
          </A>
          <A href="/learn/words/review">
            <div class="hover:underline">
              👉复习
              <span>
                {preview()?.review}
              </span>
            </div>
          </A>
        </Match>
      </Switch>
    </div>
  )
}
