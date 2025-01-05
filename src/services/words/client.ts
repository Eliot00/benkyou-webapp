import { createClient } from "~/libs/supabase/client";

export async function fetchNewWordsToLearn(scope?: string) {
  if (!scope) {
    return null
  }

  const supabase = createClient()
  const { data, error, status } = await supabase
  .from("words")
  .select("id, display, def_cn")
  .contains("tags", [scope])
  .order("seq", { ascending: true })
  .limit(10);

  if (error && status !== 406) {
    throw error
  }

  return data
}
