/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

type User = {
  id: string
}

export type AppEnv = {
  Bindings: CloudflareBindings
  Variables: { user: User }
}
