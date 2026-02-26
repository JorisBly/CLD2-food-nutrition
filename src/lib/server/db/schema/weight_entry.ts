import {date, decimal, integer, pgTable, serial} from 'drizzle-orm/pg-core';
import {dates} from "@/server/db/schema/columns.helper";
import {user} from "@/server/db/schema/user";

export const weightEntry = pgTable('weight_entries', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id).notNull(),
    weight: decimal('calories_total', {precision: 5, scale: 2}).notNull(),
    date: date(),
    ...dates,
})