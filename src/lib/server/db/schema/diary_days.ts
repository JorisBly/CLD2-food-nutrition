import {date, integer, pgTable, serial} from 'drizzle-orm/pg-core';
import {users} from "@/server/db/schema/users";
import {dates} from "@/server/db/schema/columns.helper";

export const diary_days = pgTable('diary_days', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() =>users.id),
    date: date(),
    ...dates,
})