/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { type ParentProps } from "solid-js";
import AppSidebar from "~/components/sidebar/app-sidebar";

export default function AppLayout(props: ParentProps) {
  return (
    <div class="w-full h-vh flex">
      <AppSidebar />
      <main class="w-full h-full">
        {props.children}
      </main>
    </div>
  );
}
