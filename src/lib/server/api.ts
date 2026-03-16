import {db} from "@/server/db";
import {weightEntries} from "@/server/db/schema/weight_entries.ts";
import {sql} from "drizzle-orm";
import {mealEntries} from "@/server/db/schema/meal_entries.ts";
import type {User} from "@/types.ts";
import {users} from "@/server/db/schema";

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

export async function getUserByEmail(email: string): Promise<User[]> {
 return db.select().from(users).where(sql`${email}=${email}`).limit(1)
}