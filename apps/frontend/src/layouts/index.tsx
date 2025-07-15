/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { RouteSectionProps } from '@solidjs/router'
import AppSidebar from '~/components/sidebar/app-sidebar'

export function AppLayout(props: RouteSectionProps) {
  return (
    <div class="h-vh w-full flex">
      <AppSidebar />
      <main class="h-full w-full">
        {props.children}
      </main>
    </div>
  )
}

export function WordsLayout(props: RouteSectionProps) {
  return (
    <div class="h-full w-full flex items-center justify-center">
      {props.children}
    </div>
  )
}
