import { createSignal, Show } from "solid-js"
import { type Grade, Rating } from "ts-fsrs"
import { Button } from "~/components/ui/button"
import { Skeleton } from "~/components/ui/skeleton"

type FlashcardProps = {
  question: string
  answer: string
  onGrade: (grade: Grade) => void
}

export function Flashcard(props: FlashcardProps) {
  const [showAnswer, setShowAnswer] = createSignal(false)
  const [grade, setGrade] = createSignal<Grade | null>(null)

  const onGrade = (grade: Grade) => {
    setGrade(grade)
    setShowAnswer(true)
  }

  return (
    <>
      <div lang="ja" class="font-bold text-lg">{props.question}</div>
      <div class="grow">
        <Show
          when={showAnswer()}
          fallback={
            <Skeleton class="w-40 h-8" />
          }
        >
          <div>{props.answer}</div>
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
