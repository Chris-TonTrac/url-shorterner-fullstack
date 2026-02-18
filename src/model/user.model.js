import { timestamp, pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid('user_id').primaryKey().defaultRandom(),

  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }),

  email: varchar({ length: 255 }).notNull().unique(),

  salt: text().notNull(),
  password: text().notNull(),

  createdAt: timestamp('created_At').defaultNow().notNull(),
  updatedAt: timestamp('updated_At').$onUpdate(() => new Date()),
});
