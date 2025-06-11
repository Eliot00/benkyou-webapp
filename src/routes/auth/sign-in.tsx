/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { createSignal } from "solid-js";
import { LoadingButton } from "~/components/async-button";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldRoot,
} from "~/components/ui/textfield";
import { createClient } from "~/libs/supabase/client";

export default function SignIn() {
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get("email")?.toString();
    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email });
    setIsLoading(false);
  }

  return (
    <main class="w-full h-vh flex items-center justify-center bg-background">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription class="text-center">
            Sign in to your account to continue learning Japanese
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <form class="space-y-6" onSubmit={handleSubmit}>
            <TextFieldRoot
              name="email"
              validationState={error() ? "invalid" : "valid"}
              required
            >
              <TextField type="email" placeholder="example@example.com" />
              <Show when={error()}>
                <TextFieldErrorMessage>{error()}</TextFieldErrorMessage>
              </Show>
            </TextFieldRoot>
            <LoadingButton type="submit" class="w-full" loading={isLoading()}>
              Send Magic Link
            </LoadingButton>
          </form>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <Button
              variant="outline"
              class="w-full"
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signInWithOAuth({
                  provider: "github",
                  options: {
                    redirectTo: `${import.meta.env.VITE_SITE_URL}/auth/callback`,
                  },
                });
              }}
            >
              <svg viewBox="0 0 24 24" class="mr-2 size-4">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Sign in with GitHub
            </Button>
            <Button
              variant="outline"
              class="w-full"
              onClick={async () => {
                const supabase = createClient();
                await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: `${import.meta.env.VITE_SITE_URL}/auth/callback`,
                  },
                });
              }}
            >
              <svg role="img" viewBox="0 0 24 24" class="mr-2 size-4" xmlns="http://www.w3.org/2000/svg">
                <title>Google</title>
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter class="flex justify-center">
          <p class="text-sm text-gray-600">
            Don't have an account?{" "}
            <A href="/auth/sign-up" class="text-primary hover:underline">
              Sign up
            </A>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
