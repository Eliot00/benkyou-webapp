import { A, createAsync } from "@solidjs/router";
import { Suspense } from "solid-js";
import { getLearningPreview } from "~/services/words/client"

export default function WordsPage() {
  const preview = createAsync(() => getLearningPreview())

  return (
    <div class="w-full flex gap-2 p-2">
      <A href="/learn/words/new">
        <div>
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
