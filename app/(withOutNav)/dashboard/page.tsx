import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import SignOutButton from "../../layouts/(components)/SignOutButton";
import Logo from "@/app/layouts/(components)/Logo";

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
    <main className="min-h-screen w-full text-black font-sans flex flex-col justify-start items-center">
      <div className="w-40 h-40 flex justify-center items-center rounded-full top-30 relative bg-slate-400">
        IMG
      </div>
      <div className="w-full min-h-screen bg-amber-400 mt-14 flex flex-col items-center ">
        <div className="mt-20 text-center">
          <h1>Nama</h1>
          <p>Email</p>
          <h1>Alamat</h1>
        </div>
      <div className="w-full bg-white min-h-200 ">
        <div>laporan sudah verifide</div>
        <div>laporan belum verifide</div>
        </div>
      </div>
      <div className="absolute z-100 top-0 flex justify-between px-8 py-5 w-full">
        <Link href="/">
        <ArrowLeft />
        </Link>
        <Logo />
        <SignOutButton />
      </div>

    </main>
  );
}
