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
    const res = await sql`SELECT * FROM users WHERE email = 'yashvishingala167@gmail.com'`;
    console.log("USER DATA:", JSON.stringify(res, null, 2));
    process.exit(0);
  } catch (error: any) {
    console.error("Database error:", error.message);
    process.exit(1);
  }
}

checkUsers();
