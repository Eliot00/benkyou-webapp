/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { Card } from 'ts-fsrs'
import type { LearningSession } from '~/utils/words/card'
import { query, revalidate } from '@solidjs/router'
import { createEmptyCard } from 'ts-fsrs'

import { get } from '~/utils/api'

type Preview = {
  new: number
  review: number
}

export const getLearningPreview = query(
  async () => {
    return await get<Preview>('/api/words/preview')
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
    const words = await get<NewWord[]>('/api/words/new')
    const maxSeq = words.reduce(
      (pre, cur) => pre > cur.seq ? pre : cur.seq,
      -1,
    )

    const wordCards = words.map(word => ({
      word,
      card: createEmptyCard(),
      logs: []
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
  async (): Promise<LearningSession[]> => {
    const records = await get<LearningRecord[]>('/api/words/review')
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
        logs: []
      }
    })
  },
  'getReviewCardsToLearn',
)

export async function saveReviewData(rawSessions: LearningSession[], lastSeq: number | null = null) {
  const sessions = rawSessions.map(session => {

    return {
      wordId: session.word.id,
      learningOutcome: fsrsCardToDbData(session.card),
      logs: session.logs,
    }
  })

  await fetch('/api/words/review', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ sessions, lastSeq }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  revalidate(getLearningPreview.key)
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
