/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/solid"

export const { signIn, signUp, signOut, useSession } =  createAuthClient({
  plugins: [
    magicLinkClient()
  ],
})
