/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { Card, ReviewLog } from 'ts-fsrs'

export type LearningSession = {
  word: Word
  card: Card
  logs: ReviewLog[]
}

export type Word = {
  id: string
  display: string
  defCn: string
  kana: string
  audio: string | null
}
