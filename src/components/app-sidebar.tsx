import { A, createAsync } from "@solidjs/router";
import { NotebookPen, Gamepad2 } from "lucide-solid"
import { getUserLoader } from "~/services/auth/client";
import { Show, type ParentProps } from "solid-js";

export default function AppSidebar() {
  const user = createAsync(() => getUserLoader())

  return (
    <div
      class="bg-sidebar text-sidebar-foreground h-full w-64 flex flex-col gap-4 p-2"
    >
      <header class="p-2">
        乐学日语
      </header>
      <nav class="w-full grow">
        <SidebarMenuItem href="/learn">
          <NotebookPen size={16} />
          日常学习
        </SidebarMenuItem>
        <SidebarMenuItem href="/game">
          <Gamepad2 size={16} />
          趣味游戏
        </SidebarMenuItem>
      </nav>
      <footer class="p-2">
        <Show
          when={user()}
          fallback={<SidebarMenuItem href="/auth/sign-in">Sign In</SidebarMenuItem>}>
          <span>
            {user()?.email?.slice(0, 6)}
          </span>
        </Show>
      </footer>
    </div>
  )
}

type SidebarMenuItemProps = ParentProps<{
  href: string
}>

const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  return (
    <A
      href={props.href}
      class="flex items-center gap-2 w-full p-2 rounded-md hover:(bg-sidebar-accent text-sidebar-accent-foreground)">
      {props.children}
    </A>
  )
}
