import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function checkUsers() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not found");
    process.exit(1);
  }

  const sql = neon(url);
  try {
    const res = await sql`SELECT * FROM users LIMIT 1`;
    console.log("USERS:", res);
    process.exit(0);
  } catch (error) {
    console.error("Database error:", error.message);
    process.exit(1);
  }
}

checkUsers();
