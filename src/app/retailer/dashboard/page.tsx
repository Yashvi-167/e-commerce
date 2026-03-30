import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function RetailerDashboard() {
  const session = await getSession();
  if (!session || session.role !== "RETAILER") {
    redirect("/login");
  }

  const myProducts = await prisma.product.findMany({
    where: {
      retailerId: session.userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Mock stats for the retailer dashboard
  const stats = {
    myRevenue: "$12,430.00",
    customerReach: "450",
    activeOrders: "12",
    totalListings: myProducts.length,
  };

  return <DashboardClient initialProducts={myProducts} stats={stats} role="RETAILER" />;
}
