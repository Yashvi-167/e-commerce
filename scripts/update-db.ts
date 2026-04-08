import 'dotenv/config';
import { db } from './src/db/index';
import { sql } from 'drizzle-orm';

async function updateSchema() {
  try {
    console.log("Adding password and reset columns...");
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "password" TEXT`);
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "reset_token" TEXT`);
    await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "reset_token_expiry" TIMESTAMP`);
    console.log("Schema updated successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to update schema:", error);
    process.exit(1);
  }
}

updateSchema();
