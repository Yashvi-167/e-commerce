import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Initialize the database connection.
// This requires process.env.DATABASE_URL to act as a Serverless Postgres engine pointer.
const sql = neon(process.env.DATABASE_URL || "postgresql://dummy:password@localhost/dummy");
export const db = drizzle(sql);
