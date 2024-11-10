import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export const getClientSupabase = () => {
  return supabase
}
