/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { A, createAsync } from "@solidjs/router";
import { Suspense } from "solid-js";
import { getLearningPreview } from "~/services/words"

export const route = {
  preload: () => getLearningPreview()
}

export default function WordsPage() {
  const preview = createAsync(() => getLearningPreview())

  return (
    <div class="w-full h-full flex items-center justify-center gap-6">
      <A href="/learn/words/new">
        <div class="hover:underline">
          👉新学
          <Suspense fallback={<span>0</span>}>
            <span>
              {preview()?.new}
            </span>
          </Suspense>
        </div>
      </A>
      <A href="/learn/words/review">
        <div class="hover:underline">
          👉复习
          <Suspense fallback={<span>0</span>}>
            <span>
              {preview()?.review}
            </span>
          </Suspense>
        </div>
      </A>
    </div>
  )
}
