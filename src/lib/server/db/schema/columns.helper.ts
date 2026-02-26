import {date, pgEnum} from "drizzle-orm/pg-core";

export const dates = {
    updated_at: date(),
    created_at: date().defaultNow(),
}

export const mealType = pgEnum('meal_type', ['breakfast', 'lunch', 'dinner', 'snack']);
