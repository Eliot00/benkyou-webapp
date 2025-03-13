import { LucideVolume2 } from "lucide-solid"
import { createSignal, Show } from "solid-js"
import { type Grade, Rating } from "ts-fsrs"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"
import type { Word } from "~/utils/words/card"

type FlashcardProps = {
  word: Word
  onGrade: (grade: Grade) => void
}

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
      <div lang="ja" class="font-bold text-lg">{props.word.display}</div>
      <div class="grow space-y-2">
        <div class="flex items-center gap-2">
          <Show
            when={showAnswer()}
            fallback={<Skeleton class="w-20 h-8" />}
          >
            <span lang="ja">
              {props.word.kana}
            </span>
          </Show>
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
                `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/audio/words/${props.word.audio}`
              }
            />
          </Show>
        </div>
        <Show
          when={showAnswer()}
          fallback={
            <Skeleton class="w-40 h-8" />
          }
        >
          <div>{props.word.def_cn}</div>
        </Show>
      </div>
      <div class="p-4 flex items-center justify-between">
        <Show
          when={grade()}
          fallback={
            <>
              <Button onClick={() => onGrade(Rating.Good)}>认识</Button>
              <Button onClick={() => onGrade(Rating.Hard)} variant="secondary">模糊</Button>
              <Button onClick={() => onGrade(Rating.Again)} variant="destructive">忘了</Button>
            </>
          }
        >
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
        </Show>
      </div>
    </>
  )
}
