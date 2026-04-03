import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { products } from './src/db/schema';
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log("Fixing visual mismatches in the database...");

  // Fix Silk Neck Scarf
  await db.update(products)
    .set({ imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80" })
    .where(eq(products.name, "Silk Neck Scarf"));
  
  // Fix Silk Flow Blouse
  await db.update(products)
    .set({ imageUrl: "https://images.unsplash.com/photo-1518622143749-3bc29c424097?auto=format&fit=crop&q=80" })
    .where(eq(products.name, "Silk Flow Blouse"));

  console.log("Visual mismatches fixed successfully.");
  process.exit(0);
}

main().catch(console.error);
