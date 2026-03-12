import {db} from "@/server/db";
import {weightEntry} from "@/server/db/schema/weight_entry";
import {sql} from "drizzle-orm";

export async function getUserWeights(userId:string){
    return db.select()
        .from(weightEntry)
        .where(sql`${weightEntry.userId} = ${userId}` )
}