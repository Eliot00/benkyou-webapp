import { Show } from "solid-js"
import { createStore } from "solid-js/store"
import { Button } from "~/components/ui/button"
import { createEmptyCard, FSRS, generatorParameters, Grade, Rating } from 'ts-fsrs'

export type WordCardProps = {
  words: {
    id: string,
    display: string,
    def_cn: string,
  }[]
}

const params = generatorParameters({ enable_fuzz: true })
const f = new FSRS(params)

export function WordCard(props: WordCardProps) {
  const [store, setStore] = createStore({
    index: 0,
    showAnswer: false,
    currentCard: createEmptyCard(new Date()),
    logs: []
  })

  const gradeCard = (grade: Grade) => {
    const recordLog = f.repeat(store.currentCard, new Date())
    const recordLogItem = recordLog[grade]
    console.log(recordLogItem)
  }

  return (
    <div>
      <div lang="ja" class="my-2">
        <div class="text-xl">{props.words[store.index].display}</div>
      </div>
      <Show
        when={store.showAnswer}
        fallback={
          <Button
            onClick={() => setStore("showAnswer", true)}
          >
            看答案
          </Button>
        }
      >
        <div>
          {props.words[store.index].def_cn}
        </div>
        <div>
          <Button onClick={() => gradeCard(Rating.Good)}>认识</Button>
          <Button onClick={() => gradeCard(Rating.Hard)} variant="secondary">模糊</Button>
          <Button onClick={() => gradeCard(Rating.Again)} variant="destructive">忘记了</Button>
        </div>
      </Show>
      <div>Debug: {JSON.stringify(store.currentCard)}</div>
    </div>
  )
}
