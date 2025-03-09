import { A, createAsync } from "@solidjs/router";
import { Suspense } from "solid-js";
import { getLearningPreview } from "~/services/words/client"

export default function WordsPage() {
  const preview = createAsync(() => getLearningPreview())

  return (
    <div class="w-full h-full flex items-center justify-center">
      <A href="/learn/words/new">
        <div class="p-2 rounded-md bg-outline">
          新学
          <Suspense fallback={<span>0</span>}>
            <span>
              {preview()?.newWordsCount}
            </span>
          </Suspense>
        </div>
      </A>
      <A href="/learn/words/review">
        <div>
          复习
          <Suspense fallback={<span>0</span>}>
            <span>
              {preview()?.reviewWordsCount}
            </span>
          </Suspense>
        </div>
      </A>
    </div>
  )
}
