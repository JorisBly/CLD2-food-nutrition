import {date, integer, pgTable, serial} from 'drizzle-orm/pg-core';
import {user} from "@/server/db/schema/user";
import {dates} from "@/server/db/schema/columns.helper";

export const diary_day = pgTable('diary_days', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() =>user.id),
    date: date(),
    ...dates,
})