"use server"

import type { Card } from "ts-fsrs";
import { createClient } from "~/libs/supabase/server";
import type { WordCard, InitialWordCard } from "~/utils/words/card"

export async function getLearningPreview() {
  const supabase = createClient()

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr) {
    throw authErr
  }

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data: learningProfile, error } = await supabase
    .from("learning_profiles")
    .select("last_word_seq")
    .eq("id", user.id)
    .single()

  if (error) {
    throw error
  }

  const { count: newWordsCount } = await supabase
    .from("words")
    .select("*", { count: "planned", head: true })
    .gt("seq", learningProfile.last_word_seq)

  const todayEndISO = getTodayEndISOString()
  const { count: reviewWordsCount } = await supabase
    .from("word_learning_logs")
    .select("*", { count: "exact", head: true })
    .lte("due", todayEndISO)
    .eq("user_id", user.id)

  return {
    newWordsCount: newWordsCount ?? 0,
    reviewWordsCount: reviewWordsCount ?? 0
  }
}

export async function getNewWordsToLearn() {
  const supabase = createClient()

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr) {
    throw authErr
  }

  if (!user) {
    throw new Error("Unauthorized")
  }

  const { data: learningProfile, error: profileErr } = await supabase
    .from("learning_profiles")
    .select("last_word_seq")
    .eq("id", user.id)
    .single()

    if (profileErr) {
      throw profileErr
    }

  const { data, error, status } = await supabase
    .from("words")
    .select("id,display,def_cn,seq")
    .gt("seq", learningProfile.last_word_seq)
    .order("seq", { ascending: true })
    .limit(10)

  if (error && status !== 406) {
    throw error
  }

  return data ?? []
}

export async function getReviewCardsToLearn(): Promise<InitialWordCard[]> {
  const supabase = createClient()

  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr) {
    throw authErr
  }

  if (!user) {
    throw new Error("Unauthorized")
  }

  const todayEndISO = getTodayEndISOString()
  const { data, error, status } = await supabase
    .from("word_learning_logs")
    .select(`
       id,
       due,
       stability,
       difficulty,
       elapsed_days,
       scheduled_days,
       reps,
       lapses,
       state,
       last_review,
       words (
         id,
         display,
         def_cn
       )
    `)
    .lte("due", todayEndISO)
    .eq("user_id", user.id)
    .order("due", { ascending: true })
    .limit(10)

  if (error && status !== 406) {
    throw error
  }

  if (!data) {
    return []
  }

  const result = data.map((log) => {
    const { due, state, last_review, words, ...rest } = log

    return {
      word: words!,
      card: {
        due: new Date(due),
        state: FSRS_STATE.indexOf(state),
        last_review: last_review ? new Date(last_review) : undefined,
        ...rest,
      }
    } satisfies InitialWordCard
  })

  return result
}

export async function saveReviewData(wordCards: WordCard[], lastSeq: number | null = null) {
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

  if (lastSeq) {
    await supabase
      .from("learning_profiles")
      .update({ last_word_seq: lastSeq })
      .eq("id", user.id)
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

function getTodayEndISOString(): String {
  const todayEndUTC = new Date()
  todayEndUTC.setUTCHours(23, 59, 59, 999)

  return todayEndUTC.toISOString()
}

const FSRS_STATE = ["New", "Learning", "Review", "Relearning"] as const
