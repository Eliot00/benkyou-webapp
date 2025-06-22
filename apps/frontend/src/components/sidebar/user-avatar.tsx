/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { DropdownMenuSubTriggerProps } from '@kobalte/core/dropdown-menu'
import { useNavigate } from '@solidjs/router'
import { LogOut } from 'lucide-solid'
import { Match, Suspense, Switch } from 'solid-js'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Skeleton } from '~/components/ui/skeleton'

import { signOut, useSession } from '~/libs/better-auth'
import { SidebarMenuItem } from './menu-item'

export function UserAvatar() {
  const session = useSession()
  const navigate = useNavigate()

  return (
    <Suspense>
      <Switch
        fallback={<SidebarMenuItem href="/auth/sign-in">Sign In</SidebarMenuItem>}
      >
        <Match when={session().isPending || session().isRefetching}>
          <div class="flex items-center gap-4">
            <Skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-28" />
              <Skeleton class="h-4 w-20" />
            </div>
          </div>
        </Match>
        <Match when={session().data}>
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
                        navigate('/auth/sign-in')
                      },
                    },
                  })
                }}
              >
                <LogOut />
                <span class="ml-2">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Match>
      </Switch>
    </Suspense>
  )
}
