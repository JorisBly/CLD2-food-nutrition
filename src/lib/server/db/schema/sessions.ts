import { pgTable,text,uuid} from 'drizzle-orm/pg-core';
import {dates,id} from "@/server/db/schema/columns.helper";
import {users} from "@/server/db/schema/users";

export const sessions = pgTable('sessions', {
    ...id,
    userId: uuid('user_id').references(()=>users.id),
    secretHash: text('secret_hash'),
    ...dates
})
