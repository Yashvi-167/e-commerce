import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

async function test() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT * FROM users LIMIT 1`;
    console.log("Columns:", Object.keys(result[0] || {}));
  } catch (err) {
    console.error("Connection failed:", err.message);
  }
}
test();
