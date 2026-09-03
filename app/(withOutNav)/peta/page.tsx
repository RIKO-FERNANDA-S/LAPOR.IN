import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PetaWrapper from "@/app/layouts/(map)/PetaWrapper";

export const metadata: Metadata = {
  title: "Peta Interaktif Spasial - Bina Gunung Anyar",
  description:
    "Pemetaan spasial dan pemantauan realtime laporan infrastruktur serta titik penting (POI) Kecamatan Gunung Anyar, Kota Surabaya.",
};

export default async function PetaPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white text-neutral-900 font-sans">
      {/* Main Interactive Map Canvas */}
      <main className="flex-1 relative w-full h-full overflow-hidden">
        <PetaWrapper />
      </main>
    </div>
  );
}