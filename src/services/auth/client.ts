/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { query } from "@solidjs/router";

import { getUserServerLoader } from "./server";

export const getUserLoader = query(getUserServerLoader, "getUser");
