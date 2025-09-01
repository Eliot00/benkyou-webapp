/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';

import '~/app.css';
import { AppLayout } from '~/layouts';

const Home = lazy(() => import('~/routes/home'));
const Learn = lazy(() => import('~/routes/learn'));
const Words = lazy(() => import('~/routes/learn/words'));
const NewWords = lazy(() => import('~/routes/learn/words/new'));
const ReviewWords = lazy(() => import('~/routes/learn/words/review'));
const Game = lazy(() => import('~/routes/game'));
const DateQuiz = lazy(() => import('~/routes/game/date-quiz'));
const KataPair = lazy(() => import('~/routes/game/kata-pair'));
const SignIn = lazy(() => import('~/routes/auth/sign-in'));
const SignUp = lazy(() => import('~/routes/auth/sign-up'));

export default function App() {
  return (
    <Router>
      <Route path="/" component={AppLayout}>
        <Route path="/" component={Home} />
        <Route path="/learn">
          <Route path="/" component={Learn} />
          <Route path="/words" component={Words} />
          <Route path="/words">
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
  );
}
