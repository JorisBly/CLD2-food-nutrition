import {date, decimal, integer, pgTable, serial, uuid} from 'drizzle-orm/pg-core';
import {dates, id} from "@/server/db/schema/columns.helper";
import {users} from "@/server/db/schema/users";

export const weightEntries = pgTable('weight_entries', {
    ...id,
    userId: uuid('user_id').references(() => users.id).notNull(),
    weight: decimal('weight', {precision: 5, scale: 2}).notNull(),
    date: date(),
    ...dates,
})