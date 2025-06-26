/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { Card } from 'ts-fsrs'
import type { InitialWordCard, WordCard } from '~/utils/words/card'
import { query } from '@solidjs/router'
import { createEmptyCard } from 'ts-fsrs'

import { apiPrefix } from '~/utils/api'

type Preview = {
  new: number
  review: number
}

export const getLearningPreview = query(
  async () => {
    const res = await fetch(`${apiPrefix}/words/preview`, { credentials: 'include' })
    const result: Preview = await res.json()
    return result
  },
  'getLearningPreview',
)

type NewWord = {
  id: string
  display: string
  defCn: string
  kana: string
  audio: string | null
  seq: number
}
export const getNewCardsToLearn = query(
  async () => {
    const wordsRes = await fetch(`${apiPrefix}/words/new`, { credentials: 'include' })
    const words: NewWord[] = await wordsRes.json()
    const maxSeq = words.reduce(
      (pre, cur) => pre > cur.seq ? pre : cur.seq,
      -1,
    )

    const wordCards = words.map(word => ({
      word,
      card: createEmptyCard(),
    }))

    return { wordCards, maxSeq }
  },
  'getNewCardsToLearn',
)

const FSRS_STATE = ['New', 'Learning', 'Review', 'Relearning'] as const

type LearningRecord = {
  due: string
  stability: number
  difficulty: number
  elapsedDays: number
  scheduledDays: number
  learningSteps: number
  reps: number
  lapses: number
  state: (typeof FSRS_STATE)[number]
  lastReview: string | null
  word: NewWord
}

export const getReviewCardsToLearn = query(
  async (): Promise<InitialWordCard[]> => {
    const res = await fetch(`${apiPrefix}/words/review`, { credentials: 'include' })
    const records: LearningRecord[] = await res.json()
    return records.map((record) => {
      const { word, due, state, lastReview, elapsedDays, scheduledDays, learningSteps, ...rest } = record
      return {
        word,
        card: {
          due: new Date(due),
          state: FSRS_STATE.indexOf(state),
          last_review: lastReview ? new Date(lastReview) : undefined,
          learning_steps: learningSteps,
          elapsed_days: elapsedDays,
          scheduled_days: scheduledDays,
          ...rest,
        },
      }
    })
  },
  'getReviewCardsToLearn',
)

export async function saveReviewData(wordCards: WordCard[], lastSeq: number | null = null) {
  const reviewLogs = wordCards.map(wordCard => ({
    wordId: wordCard.word.id,
    ...fsrsCardToDbData(wordCard.card),
  }))

  await fetch(`${apiPrefix}/words/review`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ reviewLogs, lastSeq }),
  })
}

function fsrsCardToDbData(card: Card) {
  return {
    ...card,
    elapsedDays: card.elapsed_days,
    learningSteps: card.learning_steps,
    scheduledDays: card.scheduled_days,
    due: card.due.toISOString(),
    lastReview: card.last_review?.toISOString(),
    state: FSRS_STATE[card.state],
  }
}
