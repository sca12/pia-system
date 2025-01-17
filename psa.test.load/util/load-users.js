/*
 * SPDX-FileCopyrightText: 2022 Helmholtz-Zentrum für Infektionsforschung GmbH (HZI) <PiaPost@helmholtz-hzi.de>
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
  let file = __ENV.USERS_FIXTURE;
  if (!file.startsWith('/')) {
    file = `../${__ENV.USERS_FIXTURE}`;
  }
  return JSON.parse(open(file));
});

export function getUser(testIteration) {
  return users[testIteration % users.length];
}
