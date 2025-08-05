import { text } from 'drizzle-orm/pg-core';

export const TABLE_NAME = 'cylinder_log'

export const properties = {
  statusResponse: text('status_response'),
};