import { A, createAsync, useNavigate } from "@solidjs/router";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { BookOpenText, Gamepad2 } from "lucide-solid"
import { getUserLoader } from "~/services/auth/client";
import { Show } from "solid-js";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import type {
  CollapsibleRootProps,
  CollapsibleTriggerProps,
} from "@kobalte/core/collapsible"

export default function AppSidebar() {
  const user = createAsync(() => getUserLoader())
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" as="a" href="/">
              <span class="font-semibold">乐学日语</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Collapsible
              defaultOpen
              as={(props: CollapsibleRootProps) => (
                <SidebarMenuItem {...props}>
                  <A href="/learn">
                    <CollapsibleTrigger
                      as={(props: CollapsibleTriggerProps) => (
                        // @ts-expect-error
                        <SidebarMenuButton
                          {...props}
                          tooltip="日常学习"
                        >
                          <BookOpenText />
                          <span>日常学习</span>
                        </SidebarMenuButton>
                      )}
                    />
                  </A>
                </SidebarMenuItem>
              )}
            />
            <Collapsible
              defaultOpen
              as={(props: CollapsibleRootProps) => (
                <SidebarMenuItem {...props}>
                  <A href="/game">
                    <CollapsibleTrigger
                      as={(props: CollapsibleTriggerProps) => (
                        // @ts-expect-error
                        <SidebarMenuButton
                          {...props}
                          tooltip="趣味游戏"
                        >
                          <Gamepad2 />
                          <span>趣味游戏</span>
                        </SidebarMenuButton>
                      )}
                    />
                  </A>
                </SidebarMenuItem>
              )}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Show
              when={user()}
              fallback={
                <SidebarMenuButton variant="outline" onClick={() => navigate("/auth/sign-in")}>
                  Sign In
                </SidebarMenuButton>
              }
            >
              <SidebarMenuButton>
                <div>{user()?.email}</div>
              </SidebarMenuButton>
            </Show>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
