/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { A } from "@solidjs/router"

export type ModuleCardProps = {
  href: string
  title: string
  description: string
}

export function ModuleCard(props: ModuleCardProps) {
  return (
    <A
      href={props.href}
      class="block p-6 bg-white text-center rounded-lg shadow-sm hover:shadow-md"
    >
      <h3 class="text-xl font-semibold text-gray-800">{props.title}</h3>
      <p class="mt-2 text-gray-600">{props.description}</p>
    </A>
  )
}
