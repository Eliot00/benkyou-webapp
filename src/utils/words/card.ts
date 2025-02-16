import { type Card, type ReviewLog } from 'ts-fsrs'

export type WordCard = {
  word: Word
  card: Card
  reviewLog: ReviewLog
}

export type Word = {
  id: string
  display: string
  def_cn: string
}
