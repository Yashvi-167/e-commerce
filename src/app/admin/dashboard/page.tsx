import { db } from "@/db";
import { products, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userRole = session.role;
  const userId = session.id;

  let dashboardProducts;

  if (userRole === "ADMIN") {
    // Admin sees all products with retailer info
    dashboardProducts = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        imageUrl: products.imageUrl,
        department: products.department,
        category: products.category,
        retailer: {
          email: users.email
        }
      })
      .from(products)
      .leftJoin(users, eq(products.retailerId, users.id))
      .orderBy(desc(products.createdAt));
  } else {
    // Retailer sees only their products
    dashboardProducts = await db
      .select()
      .from(products)
      .where(eq(products.retailerId, userId))
      .orderBy(desc(products.createdAt));
  }

  // Mock stats for the dashboard
  const stats = {
    totalRevenue: userRole === "ADMIN" ? 128430 : 12450,
    activeUsers: userRole === "ADMIN" ? 1240 : 450,
    pendingOrders: userRole === "ADMIN" ? 42 : 12,
    totalProducts: dashboardProducts.length,
  };

  return <DashboardClient initialProducts={dashboardProducts} stats={stats} role={userRole} />;
}
