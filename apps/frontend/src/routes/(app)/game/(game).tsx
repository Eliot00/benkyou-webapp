/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { ModuleCard } from "~/components/module-card"

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
