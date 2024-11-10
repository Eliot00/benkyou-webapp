import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { BookOpen, GraduationCap, MessageCircle, Globe } from 'lucide-solid'
import { A, createAsync, type RouteDefinition } from "@solidjs/router"
import { getUserLoader } from "~/services/auth/client"
import { Suspense } from "solid-js"

export const route = {
  load: async () => {
    await getUserLoader()
  }
} satisfies RouteDefinition

export default function LandingPage() {
  const user = createAsync(() => getUserLoader())

  return (
    <div class="flex flex-col min-h-screen">
      <header class="px-4 lg:px-6 h-14 flex items-center">
        <a class="flex items-center justify-center" href="#">
          <GraduationCap class="h-6 w-6 text-red-600" />
          <span class="ml-2 text-2xl font-bold text-gray-900">日本語マスター</span>
        </a>
        <nav class="ml-auto flex gap-4 sm:gap-6">
          <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </a>
          <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </a>
          <a class="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </a>
          <Suspense fallback={
          <A class="text-sm font-medium hover:underline underline-offset-4" href="/auth/signup">
            Signup
          </A>
            }>
            {user()?.email}
          </Suspense>
        </nav>
      </header>
      <main class="flex-1">
        <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-red-50">
          <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center space-y-4 text-center">
              <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Master Japanese with Confidence
                </h1>
                <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Embark on your journey to fluency with our innovative learning platform. From beginner to advanced, we've got you covered.
                </p>
              </div>
              <div class="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section class="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div class="container px-4 md:px-6">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Us?</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center">
                    <BookOpen class="mr-2 h-5 w-5 text-red-600" />
                    Comprehensive Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  From hiragana to advanced kanji, our structured lessons cover all aspects of Japanese language learning.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center">
                    <MessageCircle class="mr-2 h-5 w-5 text-red-600" />
                    Interactive Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Practice speaking and listening with our AI-powered conversation simulator, designed to improve your fluency.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center">
                    <Globe class="mr-2 h-5 w-5 text-red-600" />
                    Cultural Immersion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Dive into Japanese culture with our curated content, including anime, manga, and traditional arts.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
              <div class="space-y-2">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Start Your Japanese Journey Today</h2>
                <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of successful learners and begin your path to Japanese fluency.
                </p>
              </div>
              <div class="w-full space-y-2">
                <Button>Let's go!</Button>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <a class="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          © 2024 日本語マスター. All rights reserved.
        </p>
        <nav class="sm:ml-auto flex gap-4 sm:gap-6">
          <a class="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a class="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}
