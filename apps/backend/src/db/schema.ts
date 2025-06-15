/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { pgTable, unique, pgPolicy, timestamp, real, integer, uuid, text, pgEnum, boolean, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const words = pgTable("words", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  seq: integer().notNull(),
  display: text().notNull(),
  pitch: text(),
  pos: text().notNull(),
  kana: text().notNull(),
  defCn: text("def_cn").notNull(),
  extra: text(),
  tags: text().array(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  audio: text(),
}, (table) => [
  unique("words_seq_key").on(table.seq),
  pgPolicy("Public words are viewable only by authenticated users", { as: "permissive", for: "select", to: ["authenticated"], using: sql`true` }),
]);

export const users = pgTable("users", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  lastWordSeq: integer('last_word_seq').default(-1).notNull()
});

export const sessions = pgTable("sessions", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(()=> users.id, { onDelete: 'cascade' })
});

export const accounts = pgTable("accounts", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(()=> users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verifications = pgTable("verifications", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const fsrsCardState = pgEnum("fsrs_card_state", ['New', 'Learning', 'Review', 'Relearning'])

export const wordLearningLogs = pgTable("word_learning_logs", {
  wordId: uuid("word_id").notNull().references(() => words.id),
  userId: text("user_id").notNull().references(() => users.id),
  due: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
  stability: real().notNull(),
  difficulty: real().notNull(),
  elapsedDays: integer("elapsed_days").notNull(),
  scheduledDays: integer("scheduled_days").notNull(),
  reps: integer().notNull(),
  lapses: integer().notNull(),
  state: fsrsCardState().notNull(),
  lastReview: timestamp("last_review", { withTimezone: true, mode: 'string' }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
}, (table) => [
  primaryKey({ columns: [table.wordId, table.userId] }),
]);
