import { A, createAsync } from "@solidjs/router";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { Gamepad2 } from "lucide-solid"
import { getUserLoader } from "~/services/auth/client";
import { Show } from "solid-js";

export default function AppSidebar() {
  const user = createAsync(() => getUserLoader())

  return (
    <Sidebar>
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
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <A href="/game" class="w-full flex items-center gap-2">
                    <Gamepad2 />
                    <span>趣味游戏</span>
                  </A>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Show when={user()} fallback={<A href="/auth/sign-in">Sign In</A>}>
                <div>{user()?.email}</div>
              </Show>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
