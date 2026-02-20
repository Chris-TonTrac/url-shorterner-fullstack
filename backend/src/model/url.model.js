import { pgTable, varchar, uuid, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './user.model.js';

export const urlsTable = pgTable("urls", {
    id: uuid().primaryKey().defaultRandom(),

    userid: uuid().references(() => usersTable.id).notNull(),

    targetUrl: varchar({ length: 300 }).notNull(),
    shortCode: varchar({ length: 20 }),

    createdAt: timestamp('created_At').defaultNow().notNull(),
    updatedAt: timestamp('updated_At').$onUpdate(() => new Date()),
});