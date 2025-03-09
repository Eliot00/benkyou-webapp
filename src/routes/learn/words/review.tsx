import { createAsync, type RouteDefinition } from "@solidjs/router"
import { WordCardBox } from "~/components/words/word-card/word-card-box"
import { getReviewCardsToLearn } from "~/services/words/client"
import { saveReviewData } from "~/services/words/server"

export const route = {
  preload: () => getReviewCardsToLearn()
} satisfies RouteDefinition;

export default function ReviewWordsPage() {
  const cards = createAsync(() => getReviewCardsToLearn())

  return (
    <WordCardBox
      cards={cards()}
      onComplete={async (cards) => {
        await saveReviewData(cards)
      }}
    />
  )
}
