/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { RouteDefinition } from '@solidjs/router'
import { createAsync } from '@solidjs/router'
import { WordCardBox } from '~/components/words/word-card/word-card-box'
import { getNewCardsToLearn, saveReviewData } from '~/services/words'

export const route = {
  preload: () => getNewCardsToLearn(),
} satisfies RouteDefinition

export default function NewWordsPage() {
  const data = createAsync(() => getNewCardsToLearn())

  return (
    <WordCardBox
      cards={data()?.wordCards}
      onComplete={async (cards) => {
        await saveReviewData(cards, data()?.maxSeq)
      }}
    />
  )
}
