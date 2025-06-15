/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { Hono } from "hono";
import type { AppEnv } from "../env";
import { createDrizzleClient } from "../lib/drizzle";
import { users, wordLearningLogs, words } from "../db/schema";
import { asc, gt, eq, count, and, lte, sql } from "drizzle-orm";

const app = new Hono<AppEnv>()

app.get("/preview", async (c) => {
  const db = createDrizzleClient(c.env)
  const currentUser = c.var.user

  const total = 12637

  let review = 0

  const reviewCountRes = await db.select({ count: count() }).from(wordLearningLogs).where(eq(wordLearningLogs.userId, currentUser.id))
  if (reviewCountRes[0]) {
    review = reviewCountRes[0].count
  }

  return c.json({ new: total - review, review });
});

app.get("/new", async (c) => {
  const db = createDrizzleClient(c.env)
  const currentUser = c.var.user

  const newWords = await db.query.words.findMany({
    columns: {
      id: true,
      display: true,
      defCn: true,
      kana: true,
      audio: true,
      seq: true,
    },
    where: gt(
      words.seq,
      db.select({ lastSeq: users.lastWordSeq })
        .from(users)
        .where(eq(users.id, currentUser.id))
    ),
    orderBy: [asc(words.id)],
    limit: 10,
  })

  return c.json(newWords);
});

app.get("/review", async (c) => {
  const db = createDrizzleClient(c.env)
  const currentUser = c.var.user

  const res = await db.query.wordLearningLogs.findMany({
    columns: {
      due: true,
      stability: true,
      difficulty: true,
      elapsedDays: true,
      scheduledDays: true,
      reps: true,
      lapses: true,
      state: true,
      lastReview: true,
    },
    where: and(
      eq(wordLearningLogs.userId, currentUser.id),
      lte(
        wordLearningLogs.due,
        sql`CURRENT_DATE + interval '1 day' - interval '1 second'`
      )
    ),
    with: {
      word: {
        columns: {
          id: true,
          display: true,
          defCn: true,
          kana: true,
          audio: true,
          seq: true,
        }
      }
    },
    orderBy: [asc(wordLearningLogs.due)],
    limit: 10,
  })

  return c.json(res)
})

type NewReviewBody = {
  lastSeq: number | null
  reviewLogs: Omit<typeof wordLearningLogs.$inferInsert, 'userId'>[]
}

app.post("/review", async (c) => {
  const db = createDrizzleClient(c.env)
  const currentUser = c.var.user

  const { lastSeq, reviewLogs } = await c.req.json<NewReviewBody>()

  await db.transaction(async tx => {
    await tx
      .insert(wordLearningLogs)
      .values(reviewLogs.map(item => ({
        wordId: item.wordId,
        userId: currentUser.id,
        due: item.due,
        stability: item.stability,
        difficulty: item.difficulty,
        elapsedDays: item.elapsedDays,
        scheduledDays: item.scheduledDays,
        reps: item.reps,
        lapses: item.lapses,
        state: item.state,
        lastReview: item.lastReview,
      })))
      .onConflictDoUpdate({
        target: [wordLearningLogs.wordId, wordLearningLogs.userId],
        set: {
          due: sql`excluded.due`,
          stability: sql`excluded.stability`,
          difficulty: sql`excluded.difficulty`,
          elapsedDays: sql`excluded.elapsed_days`,
          scheduledDays: sql`excluded.scheduled_days`,
          reps: sql`excluded.reps`,
          lapses: sql`excluded.lapses`,
          state: sql`excluded.state`,
          lastReview: sql`excluded.last_review`,
        }
      })

    if (lastSeq) {
      await tx.update(users).set({ lastWordSeq: lastSeq }).where(eq(users.id, currentUser.id))
    }
  })

  return c.json({ ok: true })
})

export default app
