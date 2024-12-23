"use server"

import { createClient } from "~/libs/supabase/server";

export const getUserServerLoader = async () => {
  const supabase = createClient()

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    return null
  }

  return user
};
