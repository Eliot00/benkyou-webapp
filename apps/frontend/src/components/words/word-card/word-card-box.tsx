/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { A } from '@solidjs/router';
import { createEffect, Match, Switch } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import type { Grade } from 'ts-fsrs';
import { FSRS, generatorParameters, State } from 'ts-fsrs';
import { AutoLoadingButton } from '~/components/async-button';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Flashcard } from '~/components/words/word-card/flashcard';
import { SpellingDrill } from '~/components/words/word-card/spelling-drill';
import type { LearningSession } from '~/utils/words/card';

export type WordCardBoxProps = {
  cards?: LearningSession[];
  onComplete: (sessions: LearningSession[]) => Promise<void>;
};

type WordCardBoxUiState = {
  status: 'loading' | 'learning' | 'summarizing' | 'spelling' | 'completed' | 'idle';
  learningSessions: LearningSession[];
  finalSessions: LearningSession[];
};

const params = generatorParameters({ enable_fuzz: true });
const f = new FSRS(params);

export function WordCardBox(props: WordCardBoxProps) {
  const [state, setState] = createStore<WordCardBoxUiState>({
    status: 'loading',
    learningSessions: [],
    finalSessions: [],
  });

  createEffect(() => {
    if (props.cards) {
      const cards = props.cards;
      if (cards.length && state.status === 'loading') {
        setState(
          produce((state) => {
            state.status = 'learning';
            state.learningSessions = [...cards];
          }),
        );
      }
    }
  });

  const gradeCard = (grade: Grade) => {
    setState(
      produce((state) => {
        const currentSession = { ...state.learningSessions[0] };

        const recordLog = f.repeat(currentSession.card, new Date());
        const recordLogItem = recordLog[grade];

        currentSession.card = recordLogItem.card;
        currentSession.logs.push(recordLogItem.log);

        state.learningSessions.shift();
        if (recordLogItem.card.state === State.Review) {
          if (state.learningSessions.length === 0) {
            state.status = 'summarizing';
          }
          state.finalSessions.push(currentSession);
        } else {
          state.learningSessions.push(currentSession);
        }
      }),
    );
  };

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
          <Flashcard word={state.learningSessions[0].word} onGrade={gradeCard} />
        </Match>
        <Match when={state.status === 'summarizing'}>
          <CardFooter class="flex items-center justify-between my-auto">
            <Button
              onClick={() => setState('status', 'spelling')}
              variant="outline"
            >
              拼写练习
            </Button>
            <AutoLoadingButton
              onClick={async () => {
                await props.onComplete(state.finalSessions);
                setState('status', 'completed');
              }}
            >
              完成学习
            </AutoLoadingButton>
          </CardFooter>
        </Match>
        <Match when={state.status === 'spelling'}>
          <SpellingDrill
            words={state.finalSessions.map(s => s.word)}
            onComplete={() => setState('status', 'summarizing')}
          />
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
  );
}
