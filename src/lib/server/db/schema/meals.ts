import {integer, pgTable, serial, uuid} from 'drizzle-orm/pg-core';
import {dates,id, mealType} from "@/server/db/schema/columns.helper";
import {diaryDays} from "@/server/db/schema/diary_days";

export const meals = pgTable('meals', {
    ...id,
    diaryDay: uuid('diary_day').references(() => diaryDays.id).notNull(),
    type: mealType().notNull(),
    ...dates,
})