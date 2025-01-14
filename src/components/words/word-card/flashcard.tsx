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

  return (
    <div>
      <Show
        when={showAnswer()}
        fallback={
          <>
            <div lang="ja">{props.question}</div>
            <Button onClick={() => setShowAnswer(true)}>看答案</Button>
          </>
        }
      >
        <div>{props.answer}</div>
        <div>
          <Button onClick={() => props.onGrade(Rating.Good)}>认识</Button>
          <Button onClick={() => props.onGrade(Rating.Hard)} variant="secondary">模糊</Button>
          <Button onClick={() => props.onGrade(Rating.Again)} variant="destructive">忘记了</Button>
        </div>
      </Show>
    </div>
  )
}
