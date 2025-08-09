import { createSignal, Match, Show, Switch } from 'solid-js';
import { Button } from '~/components/ui/button';
import { TextField, TextFieldDescription, TextFieldErrorMessage, TextFieldRoot } from '~/components/ui/textfield';
import type { Word } from '~/utils/words/card';

type SpellingDrillProps = {
  words: Word[];
  onComplete: () => void;
};

type CheckResult = 'error' | 'correct';

export function SpellingDrill(props: SpellingDrillProps) {
  const [index, setIndex] = createSignal(0);
  const [userInput, setUserInput] = createSignal('');
  const [checkResult, setCheckResult] = createSignal<CheckResult | null>(null);

  function check() {
    setCheckResult(userInput() === props.words[index()].display ? 'correct' : 'error');
  }

  function nextWord() {
    const nextIndex = index() + 1;
    if (nextIndex >= props.words.length) {
      props.onComplete();
    } else {
      setIndex(nextIndex);
      setUserInput('');
      setCheckResult(null);
    }
  }

  const progress = ((index() + 1) / props.words.length) * 100;

  return (
    <div>
      <h2 class="text-4xl font-bold mb-2">拼写练习</h2>
      <div class="mb-4">
        <div class="flex justify-between text-sm text-gray-500 mb-2">
          <span>第 {index() + 1} 题</span>
          <span>{index() + 1} / {props.words.length}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div class="mb-8">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 text-center">
          <label class="block text-sm font-medium text-blue-700 mb-2">中文释义</label>
          <p class="text-2xl font-semibold text-blue-900">
            {props.words[index()].defCn}
          </p>
        </div>
      </div>
      <TextFieldRoot
        lang="ja"
        value={userInput()}
        onChange={setUserInput}
        class="mb-4"
        validationState={checkResult() === 'error' ? 'invalid' : 'valid'}
        autofocus
      >
        <TextField />
        <Switch>
          <Match when={checkResult() === 'error'}>
            <TextFieldErrorMessage>拼写错误</TextFieldErrorMessage>
          </Match>
          <Match when={checkResult() === 'correct'}>
            <TextFieldDescription>🎉 答对了！做得很棒！</TextFieldDescription>
          </Match>
        </Switch>
      </TextFieldRoot>
      <Show
        when={checkResult() === 'correct'}
        fallback={
          <Button onClick={check}>
            检查
          </Button>
        }
      >
        <Button onClick={nextWord}>
          下一个
        </Button>
      </Show>
    </div>
  );
}
