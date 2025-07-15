/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { ModuleCard } from '~/components/module-card'

export default function GamePage() {
  return (
    <div class="grid grid-cols-4 w-full gap-4 p-2">
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
