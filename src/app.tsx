import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "@unocss/reset/tailwind-compat.css"
import "virtual:uno.css"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "~/components/app-sidebar";
import { Separator } from "~/components/ui/separator";
import "./app.css"

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>乐学日语</Title>
          <Suspense>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header class="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                  </div>
                </header>
                <main class="w-full h-full">
                  {props.children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
