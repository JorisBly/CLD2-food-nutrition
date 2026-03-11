import {decimal, integer, pgTable, real, serial, uuid} from 'drizzle-orm/pg-core';
import {dates, id} from "@/server/db/schema/columns.helper";
import {meals} from "@/server/db/schema/meals";
import {foodItems} from "@/server/db/schema/food_items";

export const mealEntries = pgTable('meal_entries', {
    ...id,
    mealId: uuid('meal_id').references(() => meals.id).notNull(),
    foodItemId: uuid('food_item_id').references(() => foodItems.id).notNull(),
    quantity: real().notNull(),
    caloriesTotal: decimal('calories_total', {precision: 10, scale: 2}).notNull(),
    ProteinsTotal: decimal('proteins_total', {precision: 10, scale: 2}).notNull(),
    CarbsTotal: decimal('carbs_total', {precision: 10, scale: 2}).notNull(),
    FatsTotal: decimal('carbs_total', {precision: 10, scale: 2}).notNull(),
    ...dates,
})