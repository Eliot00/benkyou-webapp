/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { Router, Route } from '@solidjs/router'
import '@unocss/reset/tailwind-compat.css'

import '~/app.css'
import { AppLayout, WordsLayout } from '~/layouts'
import Home from '~/routes/home'
import Learn from '~/routes/learn'
import Words from '~/routes/learn/words'
import NewWords from '~/routes/learn/words/new'
import ReviewWords from '~/routes/learn/words/review'
import Game from '~/routes/game'
import DateQuiz from '~/routes/game/date-quiz'
import KataPair from '~/routes/game/kata-pair'
import SignIn from '~/routes/auth/sign-in'
import SignUp from '~/routes/auth/sign-up'

export default function App() {
  return (
    <Router>
      <Route path="/" component={AppLayout}>
        <Route path="/" component={Home} />
        <Route path="/learn">
          <Route path="/" component={Learn} />
          <Route path="/words" component={Words} />
          <Route path="/words" component={WordsLayout}>
            <Route path="/new" component={NewWords} />
            <Route path="/review" component={ReviewWords} />
          </Route>
        </Route>
        <Route path="/game">
          <Route path="/" component={Game} />
          <Route path="/date-quiz" component={DateQuiz} />
          <Route path="/kata-pair" component={KataPair} />
        </Route>
      </Route>
      <Route path="/auth">
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Route>
    </Router>
  )
}
