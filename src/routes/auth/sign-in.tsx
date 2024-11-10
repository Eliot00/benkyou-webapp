import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { TextField, TextFieldLabel, TextFieldRoot } from "~/components/ui/textfield";
import { signInAction } from "~/services/auth/client";

export default function Auth() {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  return (
    <main class="flex items-center justify-center p-4">
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle class="text-2xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription class="text-center">
            Create your account to start learning Japanese
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signInAction} method="post" class="space-y-4">
            <TextFieldRoot
              class="w-full"
              name="email"
              value={email()}
              onChange={value => setEmail(value)}
              required
            >
              <TextFieldLabel>Email</TextFieldLabel>
              <TextField type="email" placeholder="you@example.com" />
            </TextFieldRoot>
            <TextFieldRoot
              class="w-full"
              name="password"
              value={password()}
              onChange={value => setPassword(value)}
              required
            >
              <TextFieldLabel>Password</TextFieldLabel>
              <TextField type="password" />
            </TextFieldRoot>
            <Button type="submit" class="w-full">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter class="flex justify-center">
          <p class="text-sm text-gray-600">
            Already have an account?{' '}
            <A href="/auth/signin" class="text-primary hover:underline">
              Sign In
            </A>
          </p>
        </CardFooter>
      </Card>
      <form>
      </form>
    </main>
  )
}
