    import {relations} from "drizzle-orm";
    import {users} from "@/server/db/schema/users";
    import {sessions} from "@/server/db/schema/sessions";
    import { mealEntries } from "./meal_entries";
    import {foodItems} from "@/server/db/schema/food_items";
    import {meals} from "@/server/db/schema/meals";
    import {nutritionGoals} from "@/server/db/schema/nutrition_goals";
    import {weightEntries} from "@/server/db/schema/weight_entries";
    import {diaryDays} from "@/server/db/schema/diary_days";


    export const usersRelations = relations(users, ({ many }) => ({
        diaryDay: many(diaryDays),
        weightEntries: many(weightEntries),
        mealEntries: many(mealEntries),
        nutritionGoals: many(nutritionGoals),
        sessions: many(sessions),
    }));


    export const sessionsRelations = relations(sessions, ({ one }) => ({
        user: one(users, {fields: [sessions.userId], references: [users.id]})
    }))


    export const mealRelations = relations(meals, ({ many }) => ({
        mealEntries: many(mealEntries),
    }))

    export const mealEntriesRelations = relations(mealEntries, ({ one }) => ({
        meal: one(meals, {fields: [mealEntries.mealId], references: [meals.id]}),
        foodItem: one(foodItems, {fields: [mealEntries.foodItemId], references: [foodItems.id]})
    }))

    export const nutritionGoalsRelations = relations(nutritionGoals, ({ one }) => ({
        user: one(users, {fields: [nutritionGoals.userId], references: [users.id]}),
    }))

    export const foodItemRelations = relations(foodItems, ({ many }) => ({
        mealEntries: many(mealEntries),
    }))


    export const weightEntriesRelations = relations(weightEntries, ({ one }) => ({
       user: one(users, {fields: [weightEntries.userId], references: [users.id]}),
    }))

    export const diaryDaysRelations = relations(diaryDays, ({ one }) => ({
        user: one(users, {fields: [diaryDays.userId], references: [users.id]}),
    }))
    // export const tablesRealtions = relations(schema, (r) => ({
    //     weightEntries: {
    //         author : r.one.users({
    //             from: r.weightEntries.userId,
    //             to: r.users.id
    //         }),
    //     },
    //
    //     mealEntries: {
    //         author: r.one.users({
    //             from: r.mealEntries.userId,
    //             to:r.users.id
    //         }),
    //     },
    //
    //     diaryDays: {
    //         author: r.one.users({
    //             from: r.diaryDays.userId,
    //             to: r.users.id
    //         })
    //     },
    //
    //     meals: {
    //         belongsTo: r.one.diaryDays({
    //             from: r.meals.diaryDay,
    //             to: r.diaryDays.id
    //         }),
    //         foodItems: r.many.foodItems({
    //             from: r.meals.id.through(r.mealEntries.mealId),
    //             to: r.foodItems.id.through(r.mealEntries.foodItemId),
    //         })
    //     },
    //
    //     foodItems: {
    //         meals: r.many.meals(),
    //     },
    //
    //     nutritionGoals: {
    //         author: r.one.users({
    //             from: r.nutritionGoals.userId,
    //             to: r.users.id
    //         })
    //     },
    //
    //     sessions : {
    //         users: r.one.users({
    //             from: r.sessions.userId,
    //             to: r.users.id
    //         })
    //     },
    //     users: {
    //         sessions: r.many.sessions(),
    //         nutritionGoals: r.many.nutritionGoals(),
    //         mealEntries: r.many.mealEntries(),
    //         diaryDays: r.many.diaryDays(),
    //         weightEntries: r.many.weightEntries()
    //     },
    //
    // }))