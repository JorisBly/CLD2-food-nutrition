import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schemas from './schema/index'; // Importe toutes les tables
import * as relations from './schema/relations';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = neon(env.DATABASE_URL);

export const db = drizzle(client, {
    schema : {
       ...schemas,
    }
})