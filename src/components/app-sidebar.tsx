import { A, createAsync, useNavigate } from "@solidjs/router";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { BookOpenText, Gamepad2 } from "lucide-solid"
import { getUserLoader } from "~/services/auth/client";
import { Show } from "solid-js";

export default function AppSidebar() {
  const user = createAsync(() => getUserLoader())
  const navigate = useNavigate()

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
                  <A href="/learn" class="w-full flex items-center gap-2">
                    <BookOpenText />
                    <span>日常学习</span>
                  </A>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
