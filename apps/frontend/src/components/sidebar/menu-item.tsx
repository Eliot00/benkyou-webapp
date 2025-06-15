/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { A } from "@solidjs/router"
import { type ParentProps } from "solid-js"


type SidebarMenuItemProps = ParentProps<{
  href: string
}>

export const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  return (
    <A
      href={props.href}
      class="flex items-center gap-2 w-full p-2 rounded-md hover:(bg-sidebar-accent text-sidebar-accent-foreground)">
      {props.children}
    </A>
  )
}
