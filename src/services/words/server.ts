"use server"

import type { Card } from "ts-fsrs";
import { createClient } from "~/libs/supabase/server";
import type { WordCard } from "~/utils/words/card"

export async function saveReviewData(wordCards: WordCard[]) {
  const supabase = createClient()

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr) {
    throw authErr
  }

  if (!user) {
    throw new Error("Unauthorized")
  }

  const logs = wordCards.map(wordCard => ({
    user_id: user.id,
    word_id: wordCard.word.id,
    ...fsrsCardToDbData(wordCard.card),
  }))
  const { data: res, error } = await supabase
    .from("word_learning_logs")
    .upsert(logs, {
      onConflict: "user_id,word_id",
    })
    .select()

  if (error) {
    throw error
  }

  return res
}

function fsrsCardToDbData(card: Card) {
  return {
    ...card,
    due: card.due.toISOString(),
    last_review: card.last_review?.toISOString(),
    state: FSRS_STATE[card.state]
  }
}

const FSRS_STATE = ["New", "Learning", "Review", "Relearning"] as const
