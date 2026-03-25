import { db } from "@/db";
import { products } from "@/db/schema";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const allProducts = await db.select().from(products);
  return <DashboardClient initialProducts={allProducts} />;
}
