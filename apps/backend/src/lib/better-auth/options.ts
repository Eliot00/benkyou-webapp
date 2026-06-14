/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { DrizzleAdapterConfig } from "@better-auth/drizzle-adapter";
import type { BetterAuthOptions } from "better-auth";

export const betterAuthOptions: BetterAuthOptions = {
	appName: "Benkyou",
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			lastWordSeq: {
				type: "number",
				required: true,
				defaultValue: -1,
				input: false,
			},
		},
	},
	session: {
		cookieCache: {
			enabled: true,
		},
	},
};

export const drizzleAdapterConfig: DrizzleAdapterConfig = {
	provider: "pg",
	usePlural: true,
};
