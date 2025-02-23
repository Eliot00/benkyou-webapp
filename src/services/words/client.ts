import {
  getLearningPreview as getLearningPreviewServerAction,
  getNewWordsToLearn as getNewWordsToLearnServerAction,
  getReviewCardsToLearn as getReviewCardsToLearnServerAction,
} from "./server"
import { query } from "@solidjs/router";
import { createEmptyCard } from 'ts-fsrs'

export const getLearningPreview = query(
  getLearningPreviewServerAction,
  "getLearningPreview"
)

export const getNewCardsToLearn = query(
  async () => {
    const words = await getNewWordsToLearnServerAction()
    const maxSeq = words.reduce(
      (pre, cur) => pre > cur.seq ? pre : cur.seq,
      -1
    )

    const wordCards = words.map(word => ({
      word,
      card: createEmptyCard(),
    }))

    return { wordCards, maxSeq }
  },
  "getNewCardsToLearn"
)

export const getReviewCardsToLearn = query(
  getReviewCardsToLearnServerAction,
  "getReviewCardsToLearn"
)
