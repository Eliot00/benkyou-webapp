/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { type Card, type ReviewLog } from 'ts-fsrs'

export type WordCard = {
  word: Word
  card: Card
  reviewLog: ReviewLog
}

export type InitialWordCard = Omit<WordCard, "reviewLog">

export type Word = {
  id: string
  display: string
  defCn: string
  kana: string
  audio: string | null
}
