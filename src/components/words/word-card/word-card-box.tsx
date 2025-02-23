import { Match, onMount, Switch } from "solid-js"
import { createStore, produce } from "solid-js/store"
import {
  FSRS,
  generatorParameters,
  Grade,
  State,
} from 'ts-fsrs'
import type { WordCard, InitialWordCard } from '~/utils/words/card'
import { LoadingButton } from "~/components/async-button"
import { Flashcard } from "./flashcard"

export type WordCardBoxProps = {
  cards: InitialWordCard[]
  onComplete: (cards: WordCard[]) => Promise<void>
}

type WordCardBoxUiState = {
  status: 'loading' | 'learning' | 'summarizing' | 'completed' | 'idle'
  learningCards: InitialWordCard[]
  reviewCards: WordCard[]
}

const params = generatorParameters({ enable_fuzz: true })
const f = new FSRS(params)

export function WordCardBox(props: WordCardBoxProps) {
  const [state, setState] = createStore<WordCardBoxUiState>({
    status: 'loading',
    learningCards: [],
    reviewCards: []
  })

  onMount(() => {
    if (!props.cards.length) {
      setState("status", "idle")
      return
    }

    setState(
      produce((state) => {
        state.status = "learning",
        state.learningCards = [...props.cards]
      })
    )
  })

  const gradeCard = (grade: Grade) => {
    const oldWordCard = state.learningCards[0]

    const recordLog = f.repeat(
      oldWordCard.card,
      new Date(),
    )
    const recordLogItem = recordLog[grade]

    const newWordCard: WordCard = {
      word: oldWordCard.word,
      card: recordLogItem.card,
      reviewLog: recordLogItem.log,
    }

    setState(
      produce(state => {
        state.learningCards.shift()
        if (newWordCard.card.state === State.Review) {
          if (state.learningCards.length === 0) {
            state.status = "summarizing"
          }
          state.reviewCards.push(newWordCard)
        } else {
          state.learningCards.push(newWordCard)
        }
      })
    )
  }

  return (
    <div>
      <Switch>
        <Match when={state.status === 'loading'}>
          <div>加载中</div>
        </Match>
        <Match when={state.status === 'learning'}>
          <Flashcard
            question={state.learningCards[0].word.display}
            answer={state.learningCards[0].word.def_cn}
            onGrade={gradeCard}
          />
        </Match>
        <Match when={state.status === 'summarizing'}>
          <LoadingButton
            onClick={async () => {
              await props.onComplete(state.reviewCards)
              setState("status", "completed")
            }}
          >
            完成学习
          </LoadingButton>
        </Match>
        <Match when={state.status === 'completed'}>
          <div>已完成</div>
        </Match>
        <Match when={state.status === 'idle'}>
          <div>没有新的学习任务</div>
        </Match>
      </Switch>
    </div>
  )
}
