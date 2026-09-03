import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "../AdminDashboardClient";

export const metadata = {
  title: "Dashboard Admin — Bina Lapor.in",
  description: "Dashboard verifikator admin untuk mengelola verifikasi laporan dan statistik spasial.",
};

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role_id: true,
      village: true,
      city: true,
      province: true,
      latitude: true,
      longitude: true,
      is_verified: true,
    },
  });

  // Strict Admin Role Enforcement (role_id === 1)
  if (dbUser?.role_id !== 1) {
    redirect("/dashboard/user");
  }

  const userData = {
    id: session.user.id,
    name: dbUser?.name || session.user.name || "Admin Verifikator",
    email: dbUser?.email || session.user.email || "",
    image: dbUser?.image || session.user.image || null,
    role_id: dbUser?.role_id ?? 1,
    village: dbUser?.village || "Gunung Anyar",
    city: dbUser?.city || "Surabaya",
    province: dbUser?.province || "Jawa Timur",
    latitude: dbUser?.latitude ?? -7.3361,
    longitude: dbUser?.longitude ?? 112.7872,
  };

  return <AdminDashboardClient initialUser={userData} />;
}
