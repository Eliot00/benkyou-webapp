import { createEmptyCard, type Card as FsrsCard } from 'ts-fsrs'

export type Card = {
  word_id: string
  display: string
  def_cn: string
} & FsrsCard

type InnerWord = {
  id: string
  display: string
  def_cn: string
}

export function createCardWithWord(word: InnerWord): Card {
  return createEmptyCard(new Date(), (fsrsCard) => ({
    ...fsrsCard,
    word_id: word.id,
    display: word.display,
    def_cn: word.def_cn,
  }))
}
