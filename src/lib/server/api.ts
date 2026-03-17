import {db} from "@/server/db";
import {weightEntries} from "@/server/db/schema/weight_entries.ts";
import {eq, sql} from "drizzle-orm";
import {mealEntries} from "@/server/db/schema/meal_entries.ts";
import type {DiaryDay, Meal, User} from "@/types.ts";
import {diaryDays, meals, users} from "@/server/db/schema";

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

export async function getDailyMeals(userId:string, date:string){
    return db.select()
        .from(diaryDays)
        .leftJoin(meals, eq(diaryDays.id, meals.diaryDay))
        .rightJoin(mealEntries, eq(meals.id, mealEntries.mealId))
        .where(sql`${diaryDays.userId} = ${userId} AND ${diaryDays.date} = ${date}`);
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


export async function mealEntryInsertTransaction(userId: string, date: string, mealType: string, diaryDayId: undefined | string = undefined, mealId: undefined | string = undefined){
await db.transaction(async (tx) => {
let diaryDay = []
let meal = []
    if (diaryDayId !== undefined){
         [diaryDay] = tx.insert(diaryDays).values({
            userId: userId,
            date: date
        }).returning({insertedId: diaryDays.id})
    }

    if (mealId !== undefined){
        [meal] = tx.insert(mealEntries).values({
            userId: userId,
            diaryDayId: diaryDay.id,
            mealId: mealType,
        }).returning({insertedId: meals.id})
    }


   const [mealEntry] = tx.insert(mealEntries).values({
        userId: userId,
        date: date,
        mealId: meal.id,
    }).returning({insertedId: mealEntries.id})
})

}


