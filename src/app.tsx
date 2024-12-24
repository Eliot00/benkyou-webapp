import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css"
import "@unocss/reset/tailwind-compat.css"
import "virtual:uno.css"

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>乐学日语</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
