import {date, integer, pgTable, serial, uuid} from 'drizzle-orm/pg-core';
import {users} from "@/server/db/schema/users";
import {dates, id} from "@/server/db/schema/columns.helper";

export const diaryDays = pgTable('diary_days', {
    ...id,
    userId: uuid('user_id').references(() =>users.id),
    date: date(),
    ...dates,
})
