import {pgTable, serial, real, decimal, timestamp, varchar} from 'drizzle-orm/pg-core';
import {dates} from "@/server/db/schema/columns.helper";

export const foodItems = pgTable('food_items', {
    id: serial('id').primaryKey(),
    name: varchar({length: 255}).notNull(),
    calories: decimal({precision: 10, scale: 2}),
    proteins: decimal({precision: 10, scale: 2}),
    carbs: decimal({precision: 10, scale: 2}),
    fats: decimal({precision: 10, scale: 2}),
    ...dates
})