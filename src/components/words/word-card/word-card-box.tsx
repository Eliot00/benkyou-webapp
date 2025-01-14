import { Match, onMount, Switch } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { FSRS, generatorParameters, Grade, State } from 'ts-fsrs'
import { type Card, createCardWithWord } from '~/utils/words/card'

import { Flashcard } from "./flashcard"

export type WordCardProps = {
  words: {
    id: string,
    display: string,
    def_cn: string,
  }[]
}

const params = generatorParameters({ enable_fuzz: true })
const f = new FSRS(params)

type WordCardBoxUiState = {
  status: 'loading' | 'learning' | 'summarizing' | 'completed' | 'idle'
  learningCards: Card[]
  reviewCards: Card[]
}

export function WordCardBox(props: WordCardProps) {
  const [state, setState] = createStore<WordCardBoxUiState>({
    status: 'loading',
    learningCards: [],
    reviewCards: []
  })

  onMount(() => {
    if (!props.words.length) {
      setState("status", "idle")
      return
    }

    const cards = props.words.map(word => createCardWithWord(word))

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
      oldCard,
      new Date(),
    )
    const recordLogItem = recordLog[grade]

    const newCard: Card = {
      ...recordLogItem.card,
      word_id: oldCard.word_id,
      display: oldCard.display,
      def_cn: oldCard.def_cn,
    }

    setState(
      produce(state => {
        state.learningCards.shift()
        if (newCard.state === State.Review) {
          if (state.learningCards.length === 1) {
            state.status = "summarizing"
          }
          state.reviewCards.push(newCard)
        } else {
          state.learningCards.push(newCard)
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
            question={state.learningCards[0].display}
            answer={state.learningCards[0].def_cn}
            onGrade={gradeCard}
          />
        </Match>
        <Match when={state.status === 'summarizing'}>
          <div>正在统计学习进度</div>
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
