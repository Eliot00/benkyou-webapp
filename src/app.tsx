import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css"
import "@unocss/reset/tailwind-compat.css"
import "virtual:uno.css"
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter } from "~/components/ui/sidebar";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>乐学日语</Title>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader />
              <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
              </SidebarContent>
              <SidebarFooter />
            </Sidebar>
            <main>
              <SidebarTrigger />
              <Suspense>{props.children}</Suspense>
            </main>
          </SidebarProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
