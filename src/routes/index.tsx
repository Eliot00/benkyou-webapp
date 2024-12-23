import { A, createAsync, type RouteDefinition } from "@solidjs/router"
import { Show } from "solid-js"
import { getUserLoader } from "~/services/auth/client"

export const route = {
  load: async () => {
    await getUserLoader()
  }
} satisfies RouteDefinition

export default function HomePage() {
  const user = createAsync(() => getUserLoader())

  return (
    <div class="w-screen h-screen">
      <Show when={user()} fallback={<A href="/auth/sign-in">Sign In</A>}>
        <div>{user()?.email}</div>
      </Show>
      <A href="/game/kata-pair">假名配对</A>
      <A href="/game/date-quiz">日期速答</A>
    </div>
  )
}
