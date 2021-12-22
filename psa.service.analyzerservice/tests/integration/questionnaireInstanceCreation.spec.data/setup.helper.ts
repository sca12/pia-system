/*
 * SPDX-FileCopyrightText: 2021 Helmholtz-Zentrum für Infektionsforschung GmbH (HZI) <PiaPost@helmholtz-hzi.de>
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { QueryFile } from 'pg-promise';
import * as path from 'path';

import { db } from '../../../src/db';
import { disable, enable } from '../trigger.data/trigger.helper';

const setupFile = new QueryFile(path.join(__dirname, 'setup.sql'), {
  minify: true,
});
const cleanupFile = new QueryFile(path.join(__dirname, 'cleanup.sql'), {
  minify: true,
});

export async function setup(): Promise<void> {
  await disable();
  await db.none(cleanupFile);
  await db.none(setupFile);
  await enable();
}

export async function cleanup(): Promise<void> {
  await disable();
  await db.none(cleanupFile);
  await enable();
}
