import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr"
import { getRequestEvent } from "solid-js/web";

import type { Database } from "./database.types";

export function createClient() {
  return createServerClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      auth: { flowType: "pkce" },
      cookies: {
        getAll() {
          return parseCookieHeader(getRequestEvent()?.request?.headers?.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, options, value }) =>
              getRequestEvent()?.response.headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
            );
          } catch {}
        }
      }
    }
  )
}
