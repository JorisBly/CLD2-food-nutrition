import {pgTable, serial, varchar, timestamp} from 'drizzle-orm/pg-core';
import {dates, timestamps} from "@/server/db/schema/columns.helper";
import {bytes} from "drizzle-orm/gel-core";

export const session = pgTable('sessions', {
    id: serial('id').primaryKey(),
    secretHash: bytes('secret-hash'),
    ...dates,
})