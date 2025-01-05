import { createSignal, Show } from "solid-js"
import { Button } from "~/components/ui/button"

export type WordCardProps = {
  words: {
    id: string,
    display: string,
    def_cn: string,
  }[]
}

export function WordCard(props: WordCardProps) {
  const [index, setIndex] = createSignal(0)

  return (
    <div>
      <div>已学习：{index()}/{props.words.length}</div>
      <div lang="ja" class="my-2">
        <div class="text-xl">{props.words[index()].display}</div>
      </div>
      <Show when={index() < 9}>
        <Button variant="outline" onClick={() => setIndex(pre => pre + 1)}>下一词</Button>
      </Show>
    </div>
  )
}
