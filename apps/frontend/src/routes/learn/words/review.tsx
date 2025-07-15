/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { createAsync } from '@solidjs/router'
import { WordCardBox } from '~/components/words/word-card/word-card-box'
import { getReviewCardsToLearn, saveReviewData } from '~/services/words'

export default function ReviewWordsPage() {
  const cards = createAsync(() => getReviewCardsToLearn())

  return (
    <WordCardBox
      cards={cards()}
      onComplete={async (sessions) => {
        await saveReviewData(sessions)
      }}
    />
  )
}
