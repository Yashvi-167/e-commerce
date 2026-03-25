import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const url = "postgresql://neondb_owner:npg_msjPC2bkpLE6@ep-dry-silence-am0v4m0e-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function test() {
  try {
    console.log("Testing connection...");
    const sql = neon(url);
    const db = drizzle(sql);
    
    // Test a basic query (doesn't even need the schema, we can just run a raw query through sql)
    const result = await sql`SELECT NOW()`;
    console.log("Connection successful:", result);
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

test();
