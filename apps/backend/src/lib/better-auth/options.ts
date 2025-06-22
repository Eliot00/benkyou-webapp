/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { BetterAuthOptions } from 'better-auth';
import type { DrizzleAdapterConfig } from 'better-auth/adapters/drizzle';

export const betterAuthOptions: BetterAuthOptions = {
  appName: 'Benkyou',
  user: {
    additionalFields: {
      lastWordSeq: {
        type: "number",
        required: true,
        defaultValue: -1,
        input: false,
      },
    }
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
};

export const drizzleAdapterConfig: DrizzleAdapterConfig = {
  provider: 'pg',
  usePlural: true,
}
