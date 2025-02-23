import { Show } from "solid-js"
import { createAsync } from "@solidjs/router"
import { WordCardBox } from "~/components/words/word-card/word-card-box"
import { getReviewCardsToLearn } from "~/services/words/client"
import { saveReviewData } from "~/services/words/server"

export default function ReviewWordsPage() {
  const cards = createAsync(() => getReviewCardsToLearn())

  return (
    <div>
      <Show when={cards()} keyed>
        {(cards) =>
          <WordCardBox
            cards={cards}
            onComplete={async (cards) => {
              await saveReviewData(cards)
            }}
          />
        }
      </Show>
    </div>
  )
}
