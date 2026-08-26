import Navbar from "./layouts/Navbar";

export default async function Home() {
  return (
    <div className="min-h-screen flex pb-4 overflow-hidden">
      <Navbar />
    </div>
  );
}
