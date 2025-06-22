/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { ParentProps } from 'solid-js'
import { A } from '@solidjs/router'

type SidebarMenuItemProps = ParentProps<{
  href: string
}>

export function SidebarMenuItem(props: SidebarMenuItemProps) {
  return (
    <A
      href={props.href}
      class="w-full flex items-center gap-2 rounded-md p-2 hover:(bg-sidebar-accent text-sidebar-accent-foreground)"
    >
      {props.children}
    </A>
  )
}
