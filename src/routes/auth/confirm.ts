/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { APIEvent } from "@solidjs/start/server";
import { createClient } from "~/libs/supabase/server";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url)
  const searchParams = url.searchParams
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type")

  if (token_hash && type === 'email') {
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type
    })
    if (!error) {
      return Response.redirect('/', 303)
    }
  }

  return Response.redirect(`${import.meta.env.VITE_SITE_URL}/auth/auth-code-error`, 303)
}
