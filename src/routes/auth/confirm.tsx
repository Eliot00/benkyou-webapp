import { redirect, useSearchParams } from "@solidjs/router";
import { type EmailOtpType } from "@supabase/supabase-js";
import { onMount } from "solid-js";
import { supabase } from "~/libs/supabaseClient";

export default function Confirm() {
  const [searchParams] = useSearchParams()

  onMount(async () => {
    const token_hash = searchParams.token_hash as string
    const type = searchParams.type as EmailOtpType | null
    const next = (searchParams.next as string) ?? '/'

    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash
      })
      if (!error) {
        redirect(next)
      }
    }
  })

  return (
    <div></div>
  )
}
