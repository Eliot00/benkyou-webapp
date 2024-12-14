import { A } from "@solidjs/router"

export default function HomePage() {

  return (
    <div class="w-screen h-screen">
      <A href="/game/kata-pair">假名配对</A>
      <A href="/game/date-quiz">日期速答</A>
    </div>
  )
}
