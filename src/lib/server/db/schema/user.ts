import {pgTable, serial, varchar} from 'drizzle-orm/pg-core';
import {dates, timestamps} from "@/server/db/schema/columns.helper";

export const user = pgTable('users', {
    id: serial('id').primaryKey(),
    userName: varchar('username'),
    firstName: varchar('firstname'),
    lastName: varchar('lastname'),
    password: varchar('password'),
    ...dates
    })
