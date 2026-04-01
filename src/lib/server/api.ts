import {db} from "@/server/db";
import {weightEntries} from "@/server/db/schema/weight_entries.ts";
import {and, asc, desc, eq, isNull, sql} from "drizzle-orm";
import {mealEntries} from "@/server/db/schema/meal_entries.ts";
import type {DiaryDay, FoodItem, Meal, User} from "@/types.ts";
import {diaryDays, foodItems, meals, nutritionGoals, users} from "@/server/db/schema";

export async function getUserByEmail(email: string): Promise<User[]> {
    return db.select()
        .from(users)
        .where(sql`${users.email} = ${email}`)
}

export async function getUserWeights(userId:string){
    return db.select()
        .from(weightEntries)
        .where(sql`${weightEntries.userId} = ${userId}`)
        .orderBy(sql`${weightEntries.date} asc `)
}

export async function getUserMealEntries(userId:string){
    return db.select()
    .from(mealEntries)
    .where(sql`${mealEntries.userId} = ${userId}`)
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
        .where(and(eq(diaryDays.userId, userId), eq(diaryDays.date, date)))


    if (rows.length === 0) return null;

    const result =  {
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

export async function getAllDailySummary(userId: string) {
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
        .where(eq(diaryDays.userId, userId))
        .orderBy(asc(diaryDays.date))

    const daysMap = new Map<string, any>();

    rows.forEach(row => {
        const dayId = row.day.id;

        if (!daysMap.has(dayId)) {
            daysMap.set(dayId, {
                ...row.day,
                meals: []
            });
        }

        const currentDay = daysMap.get(dayId);

        if (row.meal) {
            let meal = currentDay.meals.find((m: any) => m.id === row.meal!.id);

            if (!meal) {
                meal = { ...row.meal, entries: [] };
                currentDay.meals.push(meal);
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

    return Array.from(daysMap.values());
}

export async function getUserMealsWithEntries(userId: string) {
    return db.select()
        .from(meals)
        .leftJoin(mealEntries, eq(meals.id, mealEntries.mealId))

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
    .where(sql`${meals.diaryDay} = ${diaryDayId} AND ${meals.type} = ${mealType}`);
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
    diaryDayId: string | undefined = undefined,
    mealId: string | undefined = undefined,
    foodItems: any[],
) {
    // Au lieu de db.transaction, on utilise la méthode transaction du client Neon
    // Mais attention : Drizzle sur neon-http ne supporte pas bien le tx à l'intérieur.

    // LA SOLUTION LA PLUS SIMPLE AVEC NEON-HTTP :
    // On fait les requêtes séquentiellement sans le bloc transaction,
    // ou on repasse au driver 'serverless' via WebSockets (plus complexe à configurer).

    // Voici comment le réécrire sans transaction (Neon HTTP gère bien les requêtes rapides) :
    let finalDiaryDayId = diaryDayId;
    let finalMealId = mealId;

    if (finalDiaryDayId === undefined) {
        const [insertedDiaryDay] = await db.insert(diaryDays).values({
            userId: userId,
            date: date
        }).returning({ insertedId: diaryDays.id });
        finalDiaryDayId = insertedDiaryDay.insertedId;
    }

    if (finalMealId === undefined) {
        const [insertedMeal] = await db.insert(meals).values({
            diaryDay: finalDiaryDayId,
            type: mealType,
        }).returning({ insertedId: meals.id });
        finalMealId = insertedMeal.insertedId;
    }

    if (foodItems.length > 0) {
        const entriesToInsert = foodItems.map(food => ({
            userId: userId,
            date: date,
            mealId: finalMealId,
            foodItemId: food.id,
            quantity: food.quantity
        }));

        await db.insert(mealEntries).values(entriesToInsert);
    }
}

export async function createFoodItem(values){
    await db
        .insert(foodItems)
        .values(values)
}

export async function getUserGoalByDate(userId: string, date: string){
    return db.select()
    .from(nutritionGoals)
        .where(sql`${nutritionGoals.startDate} <= ${date} AND ${nutritionGoals.userId} = ${userId}`)
}

export async function getUserGoals(userId: string){
    return db.select()
        .from(nutritionGoals)
        .where(sql`${nutritionGoals.userId} = ${userId}`)
        .orderBy(sql`${nutritionGoals.startDate} asc`)
}

export async function insertGoal(values: any){
        await db.insert(nutritionGoals).values({
            userId: values.userId,
            startDate: values.startDate,
            dailyCalories: values.dailyCalories,
            targetCarbs: values.targetCarbs,
            targetFats: values.targetFats,
            targetProteins: values.targetProteins,
        })
}

export async function endCurrentGoal(userId: string){
    await db.update(nutritionGoals)
        .set({endDate:  sql`NOW()`})
        .where(
            and(isNull(nutritionGoals.endDate),
            eq(nutritionGoals.userId, userId)
        ))

}

export async function deleteById(table:any, id: string){
    await db.delete(table).where(eq(table.id, id))

}
