import { Match, onMount, Show, Switch } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { Button } from "~/components/ui/button"
import { createEmptyCard, FSRS, generatorParameters, Grade, Rating, type Card as FsrsCard } from 'ts-fsrs'

export type WordCardProps = {
  words: {
    id: string,
    display: string,
    def_cn: string,
  }[]
}

const params = generatorParameters({ enable_fuzz: true })
const f = new FSRS(params)

type Card = {
  word_id: string
  display: string
  def_cn: string
} & FsrsCard

type WordCardBoxUiState = {
  status: 'loading' | 'learning' | 'summarizing' | 'idle'
  showAnswer: boolean
  learningCards: Card[]
  reviewCards: Card[]
}

export function WordCardBox(props: WordCardProps) {
  const [state, setState] = createStore<WordCardBoxUiState>({
    status: 'loading',
    showAnswer: false,
    learningCards: [],
    reviewCards: []
  })

  onMount(() => {
    if (!props.words.length) {
      setState("status", "idle")
      return
    }

    const cards = props.words.map(word => {
      const card = createEmptyCard<Card>(new Date(), (fsrsCard) => ({
        ...fsrsCard,
        word_id: word.id,
        display: word.display,
        def_cn: word.def_cn,
      }))

      return card
    })

    setState(
      produce((state) => {
        state.status = "learning",
        state.learningCards = cards
      })
    )
  })

  const gradeCard = (grade: Grade) => {
    const oldCard = state.learningCards[0]
    const recordLog = f.repeat(
      state.learningCards[0],
      new Date(),
    )
    const recordLogItem = recordLog[grade]
    const newCard = recordLogItem.card
  }

  return (
    <div>
      <Switch>
        <Match when={state.status === 'loading'}>
          <div>loading</div>
        </Match>
        <Match when={state.status === 'learning'}>
          <div lang="ja" class="my-2">
            <div class="text-xl">{state.learningCards[0].display}</div>
          </div>
          <Show
            when={state.showAnswer}
            fallback={
              <Button
                onClick={() => setState("showAnswer", true)}
              >
                看答案
              </Button>
            }
          >
            <div>
              {state.learningCards[0].def_cn}
            </div>
            <div>
              <Button onClick={() => gradeCard(Rating.Good)}>认识</Button>
              <Button onClick={() => gradeCard(Rating.Hard)} variant="secondary">模糊</Button>
              <Button onClick={() => gradeCard(Rating.Again)} variant="destructive">忘记了</Button>
            </div>
          </Show>
        </Match>
      </Switch>
    </div>
  )
}
