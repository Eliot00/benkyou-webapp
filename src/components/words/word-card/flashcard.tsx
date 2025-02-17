import { createSignal, Show } from "solid-js"
import { type Grade, Rating } from "ts-fsrs"
import { Button } from "~/components/ui/button"

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
    <div>
      <div lang="ja">{props.question}</div>
      <Show
        when={showAnswer()}
      >
        <div>{props.answer}</div>
      </Show>
      <div>
        <Show
          when={grade()}
          fallback={
            <div>
              <Button onClick={() => onGrade(Rating.Good)}>认识</Button>
              <Button onClick={() => onGrade(Rating.Hard)} variant="secondary">模糊</Button>
              <Button onClick={() => onGrade(Rating.Again)} variant="destructive">忘记了</Button>
            </div>
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
        </Show>
      </div>
    </div>
  )
}
