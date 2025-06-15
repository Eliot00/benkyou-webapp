/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { useSession, signOut } from "~/libs/better-auth"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { Show, Suspense } from "solid-js";
import { LogOut } from "lucide-solid"

import { SidebarMenuItem } from './menu-item'
import { useNavigate } from "@solidjs/router";

export function UserAvatar() {
  const session = useSession()
  const navigate = useNavigate()

  return (
    <Suspense>
        <Show
          when={session().data}
          fallback={<SidebarMenuItem href="/auth/sign-in">Sign In</SidebarMenuItem>}
        >
          <DropdownMenu placement="top-end">
            <DropdownMenuTrigger
              as={(props: DropdownMenuSubTriggerProps) => (
                <Button variant="outline" class="w-full" {...props}>
                  {session().data?.user?.name}
                </Button>
              )}
            />
            <DropdownMenuContent class="w-56">
              <DropdownMenuItem
                onClick={async () => {
                  await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        navigate("/auth/sign-in")
                      }
                    }
                  })
                }}
              >
                <LogOut />
                <span class="ml-2">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Show>
      </Suspense>
  )
}
