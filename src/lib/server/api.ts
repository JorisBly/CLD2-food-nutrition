import {db} from "@/server/db";
import {weightEntries} from "@/server/db/schema/weight_entries.ts";
import {and, eq, sql} from "drizzle-orm";
import {mealEntries} from "@/server/db/schema/meal_entries.ts";
import type {DiaryDay, FoodItem, Meal, User} from "@/types.ts";
import {diaryDays, foodItems, meals, users} from "@/server/db/schema";

export async function getUserByEmail(email: string): Promise<User[]> {
    return db.select()
        .from(users)
        .where(sql`${users.email} = ${email}`)
}

export async function getUserWeights(userId:string){
    return db.select()
        .from(weightEntries)
        .where(sql`${weightEntries.userId} = ${userId}` )
}

export async function getUserMeals(userId:string){
    return db.select()
    .from(mealEntries)
    .where(sql`${mealEntries.userId} = ${userId}` )
}

export async function getDailyMeals(userId: string, date: string) {
    const rows = await db.select({
        day: diaryDays,
        meal: meals,
        entry: mealEntries,
        food: foodItems,
    })
        .from(diaryDays)
        .leftJoin(meals, eq(diaryDays.id, meals.diaryDay))
        .leftJoin(mealEntries, eq(meals.id, mealEntries.mealId))
        .leftJoin(foodItems, eq(mealEntries.foodItemId, foodItems.id))
        .where(and(eq(diaryDays.userId, userId), eq(diaryDays.date, date)));

    if (rows.length === 0) return null;

    const result = {
        ...rows[0].day,
        meals: [] as any[]
    };

    rows.forEach(row => {
        if (row.meal) {
            let meal = result.meals.find(m => m.id === row.meal!.id);

            if (!meal) {
                meal = { ...row.meal, entries: [] };
                result.meals.push(meal);
            }

            if (row.entry) {
                const entryExists = meal.entries.some((e: any) => e.id === row.entry!.id);

                if (!entryExists) {
                    meal.entries.push({
                        ...row.entry,
                        food: row.food
                    });
                }
            }

        }
    });

    return result;
}

export async function getAllFoods(){
    return db.select()
    .from(foodItems)
}

export async function  getDiaryDay(userId: string, date: string): Promise<DiaryDay[]> {
 return db.select()
     .from(diaryDays)
     .where(sql`${diaryDays.userId} = ${userId} AND ${diaryDays.date} = ${date}`);
}

export function getMealByDiaryDayAndMealType(diaryDayId: string, mealType: string) {
    return db.select()
    .from(meals)
        .leftJoin(diaryDays, eq(meals.diaryDay, diaryDays.id))
    .where(sql`${diaryDays.id} = ${diaryDayId} AND ${mealType} = ${mealType}`);
}

export async function insertMealEntry(userId: string, date: string, mealId: string){
    await db.insert(mealEntries).values({
        userId: userId,
        date: date,
        mealId: mealId,
    }).returning({insertedId: mealEntries.id})
}

export async function insertMeal(userId: string,mealType: string,  diaryDayId: string){
    await db.insert(mealEntries).values({
        userId: userId,
        diaryDayId: diaryDayId,
        mealId: mealType,
    }).returning({insertedId: meals.id})
}

export async function insertDiaryDay(userId: string, date: string){
    await db.insert(diaryDays).values({
        userId: userId,
        date: date
    }).returning({insertedId: diaryDays.id})
}


export async function mealEntryInsertTransaction(
    userId: string,
    date: string,
    mealType: string,
    diaryDayId: undefined | string = undefined,
    mealId: undefined | string = undefined,
    foodItems: Object[],
){
await db.transaction(async (tx) => {

    if (diaryDayId === undefined){
        const [insertedDiaryDay] = await tx.insert(diaryDays).values({
            userId: userId,
            date: date
        }).returning({insertedId: diaryDays.id})
        diaryDayId = insertedDiaryDay.insertedId
    }

    if (mealId === undefined){
        const [insertedMeal] = await tx.insert(meals).values({
            diaryDay:  diaryDayId,
            type: mealType,
        }).returning({insertedId: meals.id})
        mealId = insertedMeal.insertedId
    }

    for(const food of foodItems){
        await tx.insert(mealEntries).values({
            userId: userId,
            date: date,
            mealId: mealId,
            foodItemId: food.id,
            quantity: food.quantity
        }).returning({insertedId: mealEntries.id})
    }

})

}

export async function createFoodItem(values){
    await db
        .insert(foodItems)
        .values(values)
}
