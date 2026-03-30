import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  const adminEmail = 'admin@belle-ame.com';
  const adminPass = 'admin123';

  console.log(`Checking for existing admin: ${adminEmail}...`);
  const [existingUser] = await db.select().from(users).where(eq(users.email, adminEmail));

  if (existingUser) {
    console.log("Admin user already exists. Updating password and role...");
    const hashedPassword = await bcrypt.hash(adminPass, 10);
    await db.update(users)
      .set({ password: hashedPassword, role: 'ADMIN' })
      .where(eq(users.id, existingUser.id));
  } else {
    console.log("Creating new default admin user...");
    const hashedPassword = await bcrypt.hash(adminPass, 10);
    await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN'
    });
  }

  console.log(`-------------------------------------------`);
  console.log(`BELLE AME AUTH INITIALIZED`);
  console.log(`Email: ${adminEmail}`);
  console.log(`Password: ${adminPass}`);
  console.log(`Role: ADMIN`);
  console.log(`-------------------------------------------`);
  process.exit(0);
}

main().catch(e => {
  console.error("Initialization Error: ", e);
  process.exit(1);
});
