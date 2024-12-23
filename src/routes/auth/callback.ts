import type { APIEvent } from "@solidjs/start/server";
import { createClient } from "~/libs/supabase/server";

export async function GET(event: APIEvent) {
  const url = new URL(event.request.url)
  const searchParams = url.searchParams
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return Response.redirect(`${import.meta.env.VITE_SITE_URL}/${next.slice(1)}`, 303)
    }
  }

  return Response.redirect(`${import.meta.env.VITE_SITE_URL}/auth/auth-code-error`, 303)
}
