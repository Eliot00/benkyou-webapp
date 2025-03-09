import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "@unocss/reset/tailwind-compat.css"
import "virtual:uno.css"
import AppSidebar from "~/components/app-sidebar";
import "./app.css"

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>乐学日语</Title>
          <Suspense>
            <div class="w-full h-vh flex">
              <AppSidebar />
              <main class="w-full h-full">
                {props.children}
              </main>
            </div>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
