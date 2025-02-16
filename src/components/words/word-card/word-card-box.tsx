import { createEffect, Match, onMount, Switch } from "solid-js"
import { createStore, produce } from "solid-js/store"
import {
  FSRS,
  generatorParameters,
  Grade,
  State,
  createEmptyCard
} from 'ts-fsrs'
import { type Word, type WordCard } from '~/utils/words/card'
import { saveReviewData } from "~/services/words/server"

import { Flashcard } from "./flashcard"

export type WordCardBoxProps = {
  words: Word[]
}

type WordCardBoxUiState = {
  status: 'loading' | 'learning' | 'summarizing' | 'completed' | 'idle'
  learningCards: InitialWordCard[]
  reviewCards: WordCard[]
}

type InitialWordCard = Omit<WordCard, "reviewLog">

const params = generatorParameters({ enable_fuzz: true })
const f = new FSRS(params)

export function WordCardBox(props: WordCardBoxProps) {
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

    const wordCards: InitialWordCard[] = props.words.map(word => ({
      word,
      card: createEmptyCard(),
    }))

    setState(
      produce((state) => {
        state.status = "learning",
        state.learningCards = wordCards
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
          if (state.learningCards.length === 1) {
            state.status = "summarizing"
          }
          state.reviewCards.push(newWordCard)
        } else {
          state.learningCards.push(newWordCard)
        }
      })
    )
  }

  createEffect(async () => {
    if (state.status === "summarizing") {
      console.log("current state", state.reviewCards)
      await saveReviewData(state.reviewCards)
      setState("status", "completed")
    }
  })

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
