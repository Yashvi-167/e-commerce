import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const allProducts = await prisma.product.findMany({
    include: {
      retailer: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Mock stats for the dashboard
  const stats = {
    totalRevenue: "$128,430.00",
    activeUsers: "1,240",
    pendingOrders: "42",
    totalProducts: allProducts.length,
  };

  return <DashboardClient initialProducts={allProducts} stats={stats} />;
}
