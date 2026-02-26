import {date, integer, pgTable, serial} from 'drizzle-orm/pg-core';
import {dates, mealType, timestamps} from "@/server/db/schema/columns.helper";
import {diary_day} from "@/server/db/schema/diary_day";

export const meal = pgTable('meals', {
    id: serial('id').primaryKey(),
    diaryDay: integer('diary_day').references(() => diary_day.id).notNull(),
    type: mealType().notNull(),
    ...dates,
})