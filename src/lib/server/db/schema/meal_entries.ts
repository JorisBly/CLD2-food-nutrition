import {decimal, integer, pgTable, real, serial} from 'drizzle-orm/pg-core';
import {dates} from "@/server/db/schema/columns.helper";
import {meals} from "@/server/db/schema/meals";
import {foodItems} from "@/server/db/schema/food_items";

export const mealEntries = pgTable('meal_entries', {
    id: serial('id').primaryKey(),
    mealId: integer('meal_id').references(() => meals.id).notNull(),
    foodItemId: integer('food_item_id').references(() => foodItems.id).notNull(),
    quantity: real().notNull(),
    caloriesTotal: decimal('calories_total', {precision: 10, scale: 2}).notNull(),
    ProteinsTotal: decimal('proteins_total', {precision: 10, scale: 2}).notNull(),
    CarbsTotal: decimal('carbs_total', {precision: 10, scale: 2}).notNull(),
    FatsTotal: decimal('carbs_total', {precision: 10, scale: 2}).notNull(),
    ...dates,
})