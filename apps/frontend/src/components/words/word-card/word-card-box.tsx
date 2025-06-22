/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { Grade } from 'ts-fsrs'
import type { InitialWordCard, WordCard } from '~/utils/words/card'
import { A } from '@solidjs/router'
import { createEffect, Match, Switch } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { FSRS, generatorParameters, State } from 'ts-fsrs'
import { AutoLoadingButton } from '~/components/async-button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { Flashcard } from './flashcard'

export type WordCardBoxProps = {
  cards?: InitialWordCard[]
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
    reviewCards: [],
  })

  createEffect(() => {
    if (props.cards) {
      const cards = props.cards
      if (cards.length && state.status === 'loading') {
        setState(
          produce((state) => {
            state.status = 'learning'
            state.learningCards = [...cards]
          }),
        )
      }
    }
  })

  const gradeCard = (grade: Grade) => {
    const oldWordCard = state.learningCards[0]

    const recordLog = f.repeat(oldWordCard.card, new Date())
    const recordLogItem = recordLog[grade]

    const newWordCard: WordCard = {
      word: oldWordCard.word,
      card: recordLogItem.card,
      reviewLog: recordLogItem.log,
    }

    setState(
      produce((state) => {
        state.learningCards.shift()
        if (newWordCard.card.state === State.Review) {
          if (state.learningCards.length === 0) {
            state.status = 'summarizing'
          }
          state.reviewCards.push(newWordCard)
        }
        else {
          state.learningCards.push(newWordCard)
        }
      }),
    )
  }

  return (
    <Card class="h-140 w-80 flex flex-col justify-between p-2">
      <Switch>
        <Match when={state.status === 'loading'}>
          <CardHeader>
            <Skeleton class="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton class="h-50 w-60" />
          </CardContent>
          <CardFooter class="flex items-center">
            <Skeleton class="h-8 w-18" />
            <Skeleton class="h-8 w-18" />
            <Skeleton class="h-8 w-18" />
          </CardFooter>
        </Match>
        <Match when={state.status === 'learning'}>
          <Flashcard word={state.learningCards[0].word} onGrade={gradeCard} />
        </Match>
        <Match when={state.status === 'summarizing'}>
          <AutoLoadingButton
            class="my-auto"
            onClick={async () => {
              await props.onComplete(state.reviewCards)
              setState('status', 'completed')
            }}
          >
            完成学习
          </AutoLoadingButton>
        </Match>
        <Match when={state.status === 'completed'}>
          <div class="m-auto">
            已完成，
            <A
              href="/learn/words"
              class="text-primary underline-offset-4 hover:underline"
            >
              回到单词主页
            </A>
          </div>
        </Match>
        <Match when={state.status === 'idle'}>
          <div>没有新的学习任务</div>
        </Match>
      </Switch>
    </Card>
  )
}
