"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/layouts/Navbar"; // SESUAIKAN PATH IMPORT NAVBAR-MU

export default function NavbarWrapper() {
  const pathname = usePathname();
  const showNavbarPaths = ["/", "/ajuan"];

  const shouldShowNavbar = showNavbarPaths.includes(pathname);

  if (!shouldShowNavbar) return null;

  return <Navbar />;
}