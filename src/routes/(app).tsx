import { type ParentProps, Suspense } from "solid-js";
import AppSidebar from "~/components/app-sidebar";

export default function AppLayout(props: ParentProps) {
  return (
    <div class="w-full h-vh flex">
      <Suspense>
        <AppSidebar />
      </Suspense>
      <main class="w-full h-full">
        {props.children}
      </main>
    </div>
  );
}
