/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { createAsync } from '@solidjs/router'
import { WordCardBox } from '~/components/words/word-card/word-card-box'
import { getNewCardsToLearn, saveReviewData } from '~/services/words'

export default function NewWordsPage() {
  const data = createAsync(() => getNewCardsToLearn())

  return (
    <WordCardBox
      cards={data()?.wordCards}
      onComplete={async (sessions) => {
        await saveReviewData(sessions, data()?.maxSeq)
      }}
    />
  )
}
