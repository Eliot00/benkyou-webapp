import { Show } from "solid-js"
import { createAsync } from "@solidjs/router"
import { WordCardBox } from "~/components/words/word-card/word-card-box"
import { getNewCardsToLearn } from "~/services/words/client"
import { saveReviewData } from "~/services/words/server"

export default function NewWordsPage() {
  const data = createAsync(() => getNewCardsToLearn())

  return (
    <div>
      <Show when={data()} keyed>
        {(data) =>
          <WordCardBox
            cards={data.wordCards}
            onComplete={async (cards) => {
              await saveReviewData(cards, data.maxSeq)
            }}
          />
        }
      </Show>
    </div>
  )
}
