import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css"
import "@unocss/reset/tailwind-compat.css"
import "virtual:uno.css"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "~/components/app-sidebar";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>乐学日语</Title>
          <Suspense>
            <SidebarProvider>
              <AppSidebar />
              <main class="w-full h-screen">
                <SidebarTrigger />
                {props.children}
              </main>
            </SidebarProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
