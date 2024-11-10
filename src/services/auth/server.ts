"use server"

import { redirect } from "@solidjs/router"
import { getRequestEvent } from "solid-js/web"

export const signInServerAction = async (form: FormData) => {
  const event = getRequestEvent()

  if (!event) {
    return
  }

  const email = String(form.get("email"))
  const password = String(form.get("password"))
  const { error } = await event.locals.supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  throw redirect("/", { revalidate: "user" })
}

export const getUserServerLoader = async () => {
  const event = getRequestEvent()

  if (!event) {
    return
  }

  const response = await event.locals.supabase.auth.getUser();
  return response.data.user;
};
