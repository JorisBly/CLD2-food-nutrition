import {pgTable, serial, varchar} from 'drizzle-orm/pg-core';
import {dates,id} from "@/server/db/schema/columns.helper";


export const users = pgTable('users', {
    ...id,
    email: varchar('email'),
    userName: varchar('username'),
    firstName: varchar('firstname'),
    lastName: varchar('lastname'),
    password: varchar('password'),
    ...dates
    })

