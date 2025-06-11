import { createEffect, Match, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Skeleton } from "~/components/ui/skeleton";
import { FSRS, generatorParameters, Grade, State } from "ts-fsrs";
import type { WordCard, InitialWordCard } from "~/utils/words/card";
import { AutoLoadingButton } from "~/components/async-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import { Flashcard } from "./flashcard";
import { A } from "@solidjs/router";

export type WordCardBoxProps = {
  cards?: InitialWordCard[];
  onComplete: (cards: WordCard[]) => Promise<void>;
};

type WordCardBoxUiState = {
  status: "loading" | "learning" | "summarizing" | "completed" | "idle";
  learningCards: InitialWordCard[];
  reviewCards: WordCard[];
};

const params = generatorParameters({ enable_fuzz: true });
const f = new FSRS(params);

export function WordCardBox(props: WordCardBoxProps) {
  const [state, setState] = createStore<WordCardBoxUiState>({
    status: "loading",
    learningCards: [],
    reviewCards: [],
  });

  createEffect(() => {
    if (props.cards) {
      const cards = props.cards;
      if (cards.length && state.status === "loading") {
        setState(
          produce((state) => {
            (state.status = "learning"), (state.learningCards = [...cards]);
          }),
        );
      }
    }
  });

  const gradeCard = (grade: Grade) => {
    const oldWordCard = state.learningCards[0];

    const recordLog = f.repeat(oldWordCard.card, new Date());
    const recordLogItem = recordLog[grade];

    const newWordCard: WordCard = {
      word: oldWordCard.word,
      card: recordLogItem.card,
      reviewLog: recordLogItem.log,
    };

    setState(
      produce((state) => {
        state.learningCards.shift();
        if (newWordCard.card.state === State.Review) {
          if (state.learningCards.length === 0) {
            state.status = "summarizing";
          }
          state.reviewCards.push(newWordCard);
        } else {
          state.learningCards.push(newWordCard);
        }
      }),
    );
  };

  return (
    <Card class="w-80 h-140 p-2 flex flex-col justify-between">
      <Switch>
        <Match when={state.status === "loading"}>
          <CardHeader>
            <Skeleton class="w-20 h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton class="w-60 h-50" />
          </CardContent>
          <CardFooter class="flex items-center">
            <Skeleton class="w-18 h-8" />
            <Skeleton class="w-18 h-8" />
            <Skeleton class="w-18 h-8" />
          </CardFooter>
        </Match>
        <Match when={state.status === "learning"}>
          <Flashcard word={state.learningCards[0].word} onGrade={gradeCard} />
        </Match>
        <Match when={state.status === "summarizing"}>
          <AutoLoadingButton
            class="my-auto"
            onClick={async () => {
              await props.onComplete(state.reviewCards);
              setState("status", "completed");
            }}
          >
            完成学习
          </AutoLoadingButton>
        </Match>
        <Match when={state.status === "completed"}>
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
        <Match when={state.status === "idle"}>
          <div>没有新的学习任务</div>
        </Match>
      </Switch>
    </Card>
  );
}
