import { createMiddleware } from "@solidjs/start/middleware"
import { supabaseMiddleware } from "~/libs/supabase/server"

export default createMiddleware({
  onRequest: [supabaseMiddleware]
})
