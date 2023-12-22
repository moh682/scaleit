import { sql } from 'drizzle-orm';
import { varchar, timestamp, index, uniqueIndex } from 'drizzle-orm/mysql-core';

import { mysqlTable } from '../utils';

export const users = mysqlTable(
  'user',
  {
    id: varchar('id', { length: 255 })
      .notNull()
      .primaryKey()
      .default(sql`(UUID())`),
    firstname: varchar('firstname', { length: 255 }).notNull(),
    lastname: varchar('lastname', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerifiedAt: timestamp('email_verified_at', { mode: 'date' }),
    password: varchar('password', { length: 255 }).notNull(),
    image: varchar('image', { length: 255 }),
  },
  (table) => ({
    emailIndex: index('email_idx').on(table.email),
    idIndex: uniqueIndex('id_idx').on(table.id),
  }),
);
