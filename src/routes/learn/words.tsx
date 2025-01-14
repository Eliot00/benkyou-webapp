import { createResource, createSignal, Match, Show, Suspense, Switch } from "solid-js";
import { Button } from "~/components/ui/button";
import { WordCardBox } from "~/components/words/word-card/word-card-box";
import { fetchNewWordsToLearn } from "~/services/words/client";

export default function WordsPage() {
  const [scope, setScope] = createSignal<string | null>()
  const [data] = createResource(scope, fetchNewWordsToLearn)

  return (
    <div class="w-full p-2">
      <Show when={!scope()}>
        <div class="w-full text-center text-2xl font-semibold my-8">请选择单词书开始学习</div>
        <div class="w-1/2 m-auto flex flex-col gap-2">
          <Button onClick={() => setScope("N1")}>N1</Button>
          <Button onClick={() => setScope("N2")}>N2</Button>
          <Button onClick={() => setScope("N3")}>N3</Button>
          <Button onClick={() => setScope("N4")}>N4</Button>
          <Button onClick={() => setScope("N5")}>N5</Button>
        </div>
      </Show>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Match when={data.error}>
            <div>Something wrong.</div>
          </Match>
          <Match when={data()}>
            <WordCardBox words={data()!} />
          </Match>
        </Switch>
      </Suspense>
    </div>
  )
}
