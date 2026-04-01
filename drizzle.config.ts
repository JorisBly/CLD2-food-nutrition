import { defineConfig } from 'drizzle-kit';
import {neon} from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema',
	dialect: 'postgresql',
	dbCredentials: { url: process.env.DATABASE_URL },
	out: "./drizzle/migrations/",
	verbose: true,
	strict: true
});
