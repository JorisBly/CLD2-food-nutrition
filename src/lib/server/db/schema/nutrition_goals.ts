import {pgTable, serial, real, decimal, timestamp, integer} from 'drizzle-orm/pg-core';
import {users} from "@/server/db/schema/users";
import {dates} from "@/server/db/schema/columns.helper";

export const nutritionGoals = pgTable('nutrition_goals', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(()=>users.id),
    dailyCalories: real('daily_calories').notNull(),
    targetProteins: decimal('target_proteins', {precision: 5, scale: 2}).notNull(),
    targetCarbs: decimal('target_carbs', {precision: 5, scale: 2}).notNull(),
    targetFats: decimal('target_fats', {precision: 5, scale: 2}).notNull(),
    startDate: timestamp('start_date').notNull().defaultNow(),
    endDate: timestamp('end_date'),
    ...dates
})