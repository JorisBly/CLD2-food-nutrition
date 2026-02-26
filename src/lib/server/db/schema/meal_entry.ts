import {decimal, integer, pgTable, real, serial} from 'drizzle-orm/pg-core';
import {dates, timestamps} from "@/server/db/schema/columns.helper";
import {meal} from "@/server/db/schema/meal";
import {foodItem} from "@/server/db/schema/food_item";

export const mealEntry = pgTable('meal_entries', {
    id: serial('id').primaryKey(),
    mealId: integer('meal_id').references(() => meal.id).notNull(),
    foodItemId: integer('food_item_id').references(() => foodItem.id).notNull(),
    quantity: real().notNull(),
    caloriesTotal: decimal('calories_total', {precision: 10, scale: 2}).notNull(),
    ProteinsTotal: decimal('proteins_total', {precision: 10, scale: 2}).notNull(),
    CarbsTotal: decimal('carbs_total', {precision: 10, scale: 2}).notNull(),
    FatsTotal: decimal('carbs_total', {precision: 10, scale: 2}).notNull(),
    ...dates,
})