/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { WorkerEntrypoint, WorkflowEntrypoint, WorkflowStep, type WorkflowEvent } from 'cloudflare:workers'
import { MongoClient } from 'mongodb'
import type { ReviewLog as FsrsReviewLog } from 'ts-fsrs'

type ReviewLog = {
  word_id: string
  user_id: string
  due: string
  review: string
} & Omit<FsrsReviewLog, 'due' | 'review'>

export default class CodeDataService extends WorkerEntrypoint<CloudflareBindings> {
  // Currently, entrypoints without a named handler are not supported
  override async fetch() {
    return new Response(null, { status: 404 })
  }

  async saveReviewLogs(logs: ReviewLog[]) {
    await this.env.REVIEW_LOGS_WORKFLOW.create({ params: logs })
  }
}

export class ReviewLogsWorkflow extends WorkflowEntrypoint<CloudflareBindings> {
  override async run(event: WorkflowEvent<ReviewLog[]>, step: WorkflowStep) {
    return step.do("save review logs", async () => {
      const client = new MongoClient(this.env.MONGO_DB_URI)
      try {
        await client.connect()
        const db = client.db('benkyou')
        const collection = db.collection('reviewLogs')
        await collection.insertMany(event.payload)
      } finally {
        await client.close()
      }
    })
  }
}
