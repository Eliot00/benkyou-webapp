import type { FetchEvent } from "@solidjs/start/server";
import { createServerClient, parseCookieHeader } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js";
import { getHeader, setCookie } from "vinxi/http";

export const supabaseMiddleware = async (event: FetchEvent) => {
  const supabase = createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      auth: { flowType: "pkce" },
      cookies: {
        getAll: () => {
          return parseCookieHeader(
            getHeader(event.nativeEvent, "Cookie") ?? ""
          );
        },
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, options, value }) =>
            setCookie(event.nativeEvent, name, value, options)
          );
        }
      }
    }
  )

  event.locals.supabase = supabase;
}

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    supabase: SupabaseClient
  }
}
