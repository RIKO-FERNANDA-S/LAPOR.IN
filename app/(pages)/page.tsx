import { auth } from "@/auth";
import LandingNavbar from "../layouts/LandingNavbar";
import LandingPage from "../layouts/landingPage";

export const metadata = {
  title: "Bina — Seberapa Layak Kotamu Hari Ini?",
  description:
    "Bina adalah platform yang membantu masyarakat melihat, menilai, dan memahami kondisi infrastruktur serta fasilitas publik berdasarkan kondisi nyata di lapangan.",
};

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <LandingNavbar user={user} />
      <LandingPage />
    </div>
  );
}
