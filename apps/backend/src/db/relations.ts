/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { relations } from 'drizzle-orm'

import { users, wordLearningLogs, words } from './schema'

export const wordsRelations = relations(words, ({ many }) => ({
  learningLogs: many(wordLearningLogs),
}))

export const wordLearningLogsRelations = relations(wordLearningLogs, ({ one }) => ({
  word: one(words, {
    fields: [wordLearningLogs.wordId],
    references: [words.id],
  }),
  user: one(users, {
    fields: [wordLearningLogs.userId],
    references: [users.id],
  }),
}))
