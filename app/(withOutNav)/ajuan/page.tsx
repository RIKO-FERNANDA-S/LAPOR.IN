import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AjuanClient from "./AjuanClient";

export const metadata = {
  title: "Form Penilaian Infrastruktur — Bina Lapor.in",
  description:
    "Formulir penilaian dan pelaporan kondisi infrastruktur serta fasilitas publik Kecamatan Gunung Anyar.",
};

export default async function AjuanPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return <AjuanClient />;
}