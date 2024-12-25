import { A, type RouteDefinition } from "@solidjs/router"
import { getUserLoader } from "~/services/auth/client"

export const route = {
  load: async () => {
    await getUserLoader()
  }
} satisfies RouteDefinition

export default function GamePage() {

  return (
    <div class="w-full p-2 space-x-2">
      <A href="/game/kata-pair">假名配对</A>
      <A href="/game/date-quiz">日期速答</A>
    </div>
  )
}
