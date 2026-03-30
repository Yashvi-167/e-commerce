import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

/**
 * BELLE AME: Unified Management Redirect
 * 
 * We have consolidated the Admin and Retailer dashboards into a single 
 * high-performance interface in /admin/dashboard. 
 * This prevents logic duplication and ensures a consistent 
 * 'BELLE AME' pink management experience across roles.
 */
export default async function RetailerDashboardRedirect() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // Both ADMIN and RETAILER are now managed through the universal center
  if (session.role === "RETAILER" || session.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  redirect("/");
}
