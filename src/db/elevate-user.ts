import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from './schema';
import { desc, eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log("Fetching last registered user...");
  const [lastUser] = await db.select().from(users).orderBy(desc(users.createdAt)).limit(1);

  if (!lastUser) {
    console.log("No users found in database.");
    process.exit(0);
  }

  console.log(`Elevating user: ${lastUser.email} to ADMIN role...`);
  await db.update(users)
    .set({ role: 'ADMIN' })
    .where(eq(users.id, lastUser.id));

  console.log("User elevated successfully. You can now access the Admin Dashboard.");
  process.exit(0);
}

main().catch(e => {
  console.error("Elevation Error: ", e);
  process.exit(1);
});
