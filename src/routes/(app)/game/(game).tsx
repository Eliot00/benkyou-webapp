import { type RouteDefinition } from "@solidjs/router"
import { ModuleCard } from "~/components/module-card"
import { getUserLoader } from "~/services/auth/client"

export const route = {
  load: async () => {
    await getUserLoader()
  }
} satisfies RouteDefinition

export default function GamePage() {

  return (
    <div class="w-full p-2 grid grid-cols-4 gap-4">
      <ModuleCard
        href="/game/kata-pair"
        title="假名配对"
        description="点击配对片假名对应的平假名"
      />
      <ModuleCard
        href="/game/date-quiz"
        title="日期速答"
        description=""
      />
    </div>
  )
}
