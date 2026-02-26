import {pgTable, serial, varchar} from 'drizzle-orm/pg-core';
import {dates} from "@/server/db/schema/columns.helper";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    userName: varchar('username'),
    firstName: varchar('firstname'),
    lastName: varchar('lastname'),
    password: varchar('password'),
    ...dates
    })
