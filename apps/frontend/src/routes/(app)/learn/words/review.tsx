/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import type { RouteDefinition } from '@solidjs/router'
import { createAsync } from '@solidjs/router'
import { WordCardBox } from '~/components/words/word-card/word-card-box'
import { getReviewCardsToLearn, saveReviewData } from '~/services/words'

export const route = {
  preload: () => getReviewCardsToLearn(),
} satisfies RouteDefinition

export default function ReviewWordsPage() {
  const cards = createAsync(() => getReviewCardsToLearn())

  return (
    <WordCardBox
      cards={cards()}
      onComplete={async (cards) => {
        await saveReviewData(cards)
      }}
    />
  )
}
