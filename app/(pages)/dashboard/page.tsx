import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Peta from "@/app/layouts/(map)/Peta.client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col"></div>
  );
}
