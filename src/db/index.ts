import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Required for Next.js App Router connection caching
neonConfig.fetchConnectionCache = true;

// Prevent Next.js from aggressively caching the database fetch calls
// neonConfig.fetchOptions = { cache: 'no-store' };

// Initialize the database connection.
// This requires process.env.DATABASE_URL to act as a Serverless Postgres engine pointer.
const sql = neon(process.env.DATABASE_URL || "postgresql://dummy:password@localhost/dummy");
export const db = drizzle(sql);
