/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { ModuleCard } from "~/components/module-card";

export default function LearnPage() {
  return (
    <div class="w-full p-2 grid grid-cols-4 gap-4">
      <ModuleCard
        href="/learn/words"
        title="单词记忆"
        description="通过卡片式学习，轻松记住日语单词。"
      />
    </div>
  )
}
