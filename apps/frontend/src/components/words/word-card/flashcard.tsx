/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { Grade } from 'ts-fsrs'
import type { Word } from '~/utils/words/card'
import { LucideVolume2 } from 'lucide-solid'
import { createSignal, Show } from 'solid-js'
import { Rating } from 'ts-fsrs'
import { Button } from '~/components/ui/button'

type FlashcardProps = {
  word: Word
  onGrade: (grade: Grade) => void
}

const HIDDEN_TEXT_CLASS = 'text-transparent animate-pulse rounded-md bg-primary/10'

export function Flashcard(props: FlashcardProps) {
  const [showAnswer, setShowAnswer] = createSignal(false)
  const [grade, setGrade] = createSignal<Grade | null>(null)
  let audioRef: HTMLAudioElement | undefined

  const playAudio = () => {
    if (props.word.audio && audioRef) {
      audioRef.play()
    }
  }

  const onGrade = (grade: Grade) => {
    setGrade(grade)
    setShowAnswer(true)
    playAudio()
  }

  return (
    <>
      <hgroup class="mb-2 w-full text-center">
        <h2 lang="ja" class="w-full flex items-center justify-center text-3xl font-bold">
          {props.word.display}
          <Show when={props.word.audio}>
            <button
              on:click={() => {
                playAudio()
              }}
              class="rounded-full p-2 hover:bg-accent"
            >
              <LucideVolume2 />
            </button>
            <audio
              ref={audioRef}
              src={
                `${import.meta.env.PUBLIC_OSS_PREFIX}/audio/words/${props.word.audio}`
              }
            />
          </Show>
        </h2>
        <p
          lang="ja"
          class="transition-colors duration-200"
        >
          <span
            class={showAnswer() ? 'text-muted-foreground' : HIDDEN_TEXT_CLASS}
          >
            {props.word.kana}
          </span>
        </p>
      </hgroup>
      <section class="grow space-y-2">
        <p>
          <span class="text-muted-foreground">释义:&nbsp</span>
          <span class={showAnswer() ? '' : HIDDEN_TEXT_CLASS}>{props.word.defCn}</span>
        </p>
      </section>
      <div class="w-full p-4">
        <Show
          when={grade()}
          fallback={(
            <div class="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                class="border-green-500 hover:bg-green-50 hover:text-green-700"
                onClick={() => onGrade(Rating.Good)}
              >
                认识
              </Button>
              <Button
                variant="outline"
                class="border-yellow-500 hover:bg-yellow-50 hover:text-yellow-700"
                onClick={() => onGrade(Rating.Hard)}
              >
                模糊
              </Button>
              <Button
                variant="outline"
                class="border-red-500 hover:bg-red-50 hover:text-red-700"
                onClick={() => onGrade(Rating.Again)}
              >
                忘了
              </Button>
            </div>
          )}
        >
          <div class="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                setShowAnswer(false)
                props.onGrade(grade()!)
                setGrade(null)
              }}
            >
              下一词
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowAnswer(false)
                props.onGrade(Rating.Again)
                setGrade(null)
              }}
            >
              记错了
            </Button>
          </div>
        </Show>
      </div>
    </>
  )
}
