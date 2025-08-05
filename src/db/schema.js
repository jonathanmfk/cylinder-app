import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

import { TABLE_NAME as CYLINDER, properties as cylinderProperties } from './schema/cylinder.js'
import { TABLE_NAME as CYLINDER_LOG, properties as cylinderLogProperties } from './schema/cylinderLog.js'

const id = { id: serial('id').primaryKey() };

const audit = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: text('created_by').notNull(),
}

export const cylinderTable = pgTable(CYLINDER, { ...id, ...cylinderProperties, ...audit });

export const cylinderLogTable = pgTable(CYLINDER_LOG, {
  ...id, ...cylinderLogProperties,
  cylinderId: serial("cylinder_id").references(() => cylinderTable.id),
  ...audit
});

