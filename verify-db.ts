import "dotenv/config";
import { db } from "./src/db";
import { products } from "./src/db/schema";
import { desc } from "drizzle-orm";

async function main() {
  const all = await db.select().from(products).orderBy(desc(products.id)).limit(10);
  console.log("LAST 10 PRODUCTS:");
  console.log(JSON.stringify(all, null, 2));
}

main().catch(console.error);
