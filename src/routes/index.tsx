import { A } from "@solidjs/router"

export default function HomePage() {

  return (
    <div class="w-full p-2 space-x-2">
      <A href="/game/kata-pair">假名配对</A>
      <A href="/game/date-quiz">日期速答</A>
    </div>
  )
}
