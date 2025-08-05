import { text } from 'drizzle-orm/pg-core';

export const TABLE_NAME = 'cylinder'

export const properties = {
  name: text('name').notNull(),
  imgId: text('img_id'),
  description: text('description'),
  status: text('status').notNull(),
};