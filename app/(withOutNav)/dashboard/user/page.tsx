import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserDashboardClient from "../UserDashboardClient";

export const metadata = {
  title: "Dashboard Warga — Bina Lapor.in",
  description: "Dashboard pengguna warga untuk mengelola profil dan riwayat laporan.",
};

export default async function UserDashboardPage() {
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

  const userData = {
    id: session.user.id,
    name: dbUser?.name || session.user.name || "Warga Lapor.in",
    email: dbUser?.email || session.user.email || "",
    image: dbUser?.image || session.user.image || null,
    role_id: dbUser?.role_id ?? 2,
    village: dbUser?.village || "Gunung Anyar",
    city: dbUser?.city || "Surabaya",
    province: dbUser?.province || "Jawa Timur",
    latitude: dbUser?.latitude ?? -7.3361,
    longitude: dbUser?.longitude ?? 112.7872,
  };

  return <UserDashboardClient initialUser={userData} />;
}
