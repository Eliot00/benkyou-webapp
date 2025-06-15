/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button"
import { TextField, TextFieldRoot } from "~/components/ui/textfield"

const WEEKDAYS = [
  '日曜日',
  '月曜日',
  '火曜日',
  '水曜日',
  '木曜日',
  '金曜日',
  '土曜日',
];

const MONTHS = [
  'いちがつ',
  'にがつ',
  'さんがつ',
  'よんがつ',
  'ごがつ',
  'ろくがつ',
  'しちがつ',
  'はちがつ',
  'くがつ',
  'じゅうがつ',
  'じゅういちがつ',
  'じゅうにがつ'
];

const DAYS = [
  'ついたち',
  'ふつか',
  'みっか',
  'よっか',
  'いつか',
  'むいか',
  'なのか',
  'ようか',
  'ここのか',
  'とおか',
  'じゅういちにち',
  'じゅうににち',
  'じゅうさんにち',
  'じゅうよっか',
  'じゅうごにち',
  'じゅうろくにち',
  'じゅうしちにち',
  'じゅうはちにち',
  'じゅうくにち',
  'はつか',
  'にじゅういちにち',
  'にじゅうににち',
  'にじゅうさんにち',
  'にじゅうよんにち',
  'にじゅうごにち',
  'にじゅうろくにち',
  'にじゅうしちにち',
  'にじゅうはちにち',
  'にじゅうくにち',
  'さんじゅうにち',
  'さんじゅういちにち'
];

export default function DateQuiz() {
  const [weekday, setWeekday] = createSignal("")
  const [date, setDate] = createSignal("")
  const [feedback, setFeedback] = createSignal("")

  const validate = () => {
    const now = new Date()
    const currentWeekday = WEEKDAYS[now.getDay()]
    const currentDate = MONTHS[now.getMonth()] + DAYS[now.getDate() - 1]

    if (currentWeekday === weekday().trim() && currentDate === date().trim()) {
      setFeedback("✅ 正确！")
    } else {
      setFeedback("❌ 错误！")
    }
  }

  return (
    <main class="max-w-sm m-auto p-2">
      <h1 class="font-semibold text-2xl text-center my-4">日期速答</h1>
      <form class="space-y-2">
        <TextFieldRoot onChange={setWeekday} value={weekday()}>
          <TextField placeholder="今天是周几呢？" />
        </TextFieldRoot>
        <TextFieldRoot onChange={setDate} value={date()}>
          <TextField name="date" placeholder="今天的日期是？" />
        </TextFieldRoot>
        <Button onClick={validate}>验证</Button>
        <div class="semibold">{feedback()}</div>
      </form>
    </main>
  )
}
