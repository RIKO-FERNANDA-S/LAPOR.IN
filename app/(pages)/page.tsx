import Navbar from "../layouts/Navbar";
import LandingPage from "../layouts/landingPage";

export default async function Home() {
  return (
    <div className="min-h-screen flex pb-4 overflow-hidden">
      <LandingPage/>
    </div>
  );
}
