/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as relations from '../db/relations'
import * as schema from '../db/schema'

export function createDrizzleClient(env: CloudflareBindings) {
  const client = postgres(env.HYPERDRIVE.connectionString, { max: 5 })
  return drizzle({ client, schema: { ...schema, ...relations } })
}
