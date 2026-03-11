import {integer, pgTable, serial, uuid} from 'drizzle-orm/pg-core';
import {dates,id} from "@/server/db/schema/columns.helper";
import {bytes} from "drizzle-orm/gel-core";
import {users} from "@/server/db/schema/users";

export const sessions = pgTable('sessions', {
    ...id,
    userId: uuid('user_id').references(()=>users.id),
    secretHash: bytes('secret_hash'),
    ...dates
})