import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function updateSchema() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not found");
    process.exit(1);
  }

  const sql = neon(url);
  try {
    console.log("Adding columns via raw SQL...");
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "password" TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "reset_token" TEXT`;
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS "reset_token_expiry" TIMESTAMP`;
    console.log("Schema updated successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Failed to update schema:", error);
    process.exit(1);
  }
}

updateSchema();
