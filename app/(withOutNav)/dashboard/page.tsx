import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardIndexPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role_id: true },
  });

  if (dbUser?.role_id === 1) {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/user");
  }
}
