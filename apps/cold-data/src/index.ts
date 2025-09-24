/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { WorkerEntrypoint, WorkflowEntrypoint, type WorkflowEvent, WorkflowStep } from 'cloudflare:workers';
import { MongoClient } from 'mongodb';
import type { ReviewLog as FsrsReviewLog } from 'ts-fsrs';

type ReviewLog = {
  word_id: string;
  user_id: string;
  due: string;
  review: string;
} & Omit<FsrsReviewLog, 'due' | 'review'>;

export class CodeDataService extends WorkerEntrypoint {
  // Currently, entrypoints without a named handler are not supported
  override async fetch() {
    return new Response(null, { status: 404 });
  }

  async saveReviewLogs(logs: ReviewLog[]) {
    await this.env.REVIEW_LOGS_WORKFLOW.create({ params: { logs } });
  }
}

export class ReviewLogsWorkflow extends WorkflowEntrypoint<{ MONGO_DB_URI: string }> {
  override async run(event: WorkflowEvent<{ logs: ReviewLog[] }>, step: WorkflowStep) {
    const uri = this.env.MONGO_DB_URI;
    return step.do('save review logs', async () => {
      const client = new MongoClient(uri, {
        maxPoolSize: 1,
        minPoolSize: 0,
        serverSelectionTimeoutMS: 5000,
      });
      try {
        await client.connect();
        const db = client.db('benkyou');
        const collection = db.collection('reviewLogs');

        const { logs } = event.payload;
        await collection.insertMany(logs);
      } finally {
        await client.close();
      }
    });
  }
}

export default CodeDataService;
