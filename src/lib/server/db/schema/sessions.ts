import {pgTable, serial} from 'drizzle-orm/pg-core';
import {dates} from "@/server/db/schema/columns.helper";
import {bytes} from "drizzle-orm/gel-core";

export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    secretHash: bytes('secret-hash'),
    ...dates
})