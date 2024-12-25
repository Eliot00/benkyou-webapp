import { Index, onMount } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { Button } from "~/components/ui/button"

const KANA_MAP = {
  'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ',
  'か': 'カ', 'き': 'キ', 'く': 'ク', 'け': 'ケ', 'こ': 'コ',
  'さ': 'サ', 'し': 'シ', 'す': 'ス', 'せ': 'セ', 'そ': 'ソ',
  'た': 'タ', 'ち': 'チ', 'つ': 'ツ', 'て': 'テ', 'と': 'ト',
  'な': 'ナ', 'に': 'ニ', 'ぬ': 'ヌ', 'ね': 'ネ', 'の': 'ノ',
  'は': 'ハ', 'ひ': 'ヒ', 'ふ': 'フ', 'へ': 'ヘ', 'ほ': 'ホ',
  'ま': 'マ', 'み': 'ミ', 'む': 'ム', 'め': 'メ', 'も': 'モ',
  'や': 'ヤ', 'ゆ': 'ユ', 'よ': 'ヨ',
  'ら': 'ラ', 'り': 'リ', 'る': 'ル', 'れ': 'レ', 'ろ': 'ロ',
  'わ': 'ワ', 'を': 'ヲ',
  'ん': 'ン'
}

type StoreData = {
  pairs: Pair[]
  lastSelected: number | null
  isSelectable: boolean
  score: number
}

export default function KataPair() {
  const [store, setStore] = createStore<StoreData>({
    pairs: generatePairs(),
    lastSelected: null,
    isSelectable: true,
    score: 0,
  })

  onMount(() => {
    setStore("pairs", generatePairs())
  })

  const handleClick = (index: number) => {
    const firstSelected = store.lastSelected
    if (firstSelected !== null) {
      if (firstSelected === index) {
        setStore(produce(state => {
          state.pairs[index][2] = null
          state.lastSelected = null
        }))
        return
      }

      setStore(produce(state => {
        state.isSelectable = false
        state.pairs[index][2] = 'selected'
      }))

      if (store.pairs[firstSelected][0] === store.pairs[index][0]) {
        setTimeout(() => {
          setStore(produce(state => {
            state.score = state.score + 1
            state.pairs[firstSelected][2] = 'matched'
            state.pairs[index][2] = 'matched'
            state.isSelectable = true
            state.lastSelected = null
          }))
        }, 500)
      } else {
        setStore(produce(state => {
          state.pairs[firstSelected][2] = 'error'
          state.pairs[index][2] = 'error'
        }))
        setTimeout(() => {
          setStore(produce(state => {
            state.pairs[firstSelected][2] = null
            state.pairs[index][2] = null
            state.isSelectable = true
            state.lastSelected = null
          }))
        }, 500)
      }
    } else {
      setStore(produce(state => {
        state.lastSelected = index
        state.pairs[index][2] = 'selected'
      }))
    }
  }

  return (
    <div lang="ja">
      <div class="m-2">Score: {store.score}</div>
      <div class="grid grid-cols-4 gap-4">
        <Index each={store.pairs}>
          {(pair, index) => (
            <button
              class={`p-2 hover:shadow border text-4xl flex items-center justify-center min-h-16 rounded-lg ${countBackground(pair()[2])}` }
              onClick={() => handleClick(index)}
              disabled={!store.isSelectable || (pair()[2] === 'matched')}
            >
              {pair()[1]}
            </button>
          )}
        </Index>
      </div>
      <Button
        class="m-2"
        onClick={() => {
          setStore(produce(state => {
            state.pairs = generatePairs()
            state.lastSelected = null
            state.isSelectable = true
          }))
        }}
      >
        重新生成
      </Button>
    </div>
  )
}

type Pair = [string, string, 'selected' | 'matched' | 'error' | null]

function generatePairs(count: number = 16) {
  const entries = Object.entries(KANA_MAP)
  const picked = entries.slice(0, count / 2)

  const hiraHira = picked.map(([key, _]) => ([key, key, null] as Pair))
  const hiraKata = picked.map(([key, value]) => ([key, value, null] as Pair))
  return [...hiraHira, ...hiraKata].sort(() => Math.random() - 0.5)
}

function countBackground(status: Pair["2"]) {
  switch (status) {
    case 'selected':
      return 'bg-emerald-200'
    case 'matched':
      return 'bg-muted'
    case 'error':
      return 'bg-red-200'
    default:
      return ''
  }
}
