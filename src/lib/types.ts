import {sessions} from "@/server/db/schema/sessions";
import {users} from "@/server/db/schema/users";
import {weightEntry} from "@/server/db/schema/weight_entry";
import {mealEntries} from "@/server/db/schema/meal_entries";
import {meals} from "@/server/db/schema/meals";
import {nutritionGoals} from "@/server/db/schema/nutrition_goals";
import {foodItems} from "@/server/db/schema/food_items";
import {diary_days} from "@/server/db/schema/diary_days";

export type User = typeof users.$inferSelect;

export type Session = typeof sessions.$inferSelect;

export type WeightEntry = typeof weightEntry.$inferSelect;

export type MealEntry = typeof mealEntries.$inferSelect;

export type Meal = typeof meals.$inferSelect;

export type NutritionGoal = typeof nutritionGoals.$inferSelect;

export type FoodItem = typeof foodItems.$inferSelect;

export type DiaryDay = typeof diary_days.$inferSelect;


export class SessionWithToken {
    id: string;
    secretHash:Uint8Array;
    constructor(private readonly session: Session){
        this.id = session.id;
        this.secretHash = session.secretHash;
    }
}
