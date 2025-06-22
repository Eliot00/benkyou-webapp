/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { Gamepad2, NotebookPen } from 'lucide-solid'

import { SidebarMenuItem } from './menu-item'
import { UserAvatar } from './user-avatar'

export default function AppSidebar() {
  return (
    <div
      class="h-full w-64 flex flex-col gap-4 bg-sidebar p-2 text-sidebar-foreground"
    >
      <header class="p-2">
        乐学日语
      </header>
      <nav class="w-full grow">
        <SidebarMenuItem href="/learn">
          <NotebookPen size={16} />
          日常学习
        </SidebarMenuItem>
        <SidebarMenuItem href="/game">
          <Gamepad2 size={16} />
          趣味游戏
        </SidebarMenuItem>
      </nav>
      <footer class="p-2">
        <UserAvatar />
      </footer>
    </div>
  )
}
