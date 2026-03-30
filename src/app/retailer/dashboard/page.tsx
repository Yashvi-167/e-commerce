import { redirect } from "next/navigation";

export default function RetailerDashboard() {
  // Redirect to the unified Management Center that handles both ADMIN and RETAILER roles
  redirect("/admin/dashboard");
}
