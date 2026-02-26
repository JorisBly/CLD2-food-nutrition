import {integer, pgTable, serial} from 'drizzle-orm/pg-core';
import {dates, mealType} from "@/server/db/schema/columns.helper";
import {diary_days} from "@/server/db/schema/diary_days";

export const meals = pgTable('meals', {
    id: serial('id').primaryKey(),
    diaryDay: integer('diary_day').references(() => diary_days.id).notNull(),
    type: mealType().notNull(),
    ...dates,
})