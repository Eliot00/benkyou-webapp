/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: Copyright 2025 Benkyou Project
 */

import { render } from 'solid-js/web';
import App from '~/app';

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}
