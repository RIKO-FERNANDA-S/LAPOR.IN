import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "./(components)/Logo";


async function Navbar() {
  const session = await auth();
const user = session?.user;

  return (
    <div className="flex h-24 w-full items-center justify-between px-15">
      
      <Logo/>

      <div className="flex justify-center items-center gap-8">
        <Link href="/">Beranda</Link>
        <Link href="/ajuan">Ajuan Laporan</Link>
        <Link href="/peta">Peta</Link>
        <Link href="/komunitas">Komunitas</Link>
      </div>

      {user ? (
        <>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-indigo-500/20 text-sm"
          >
            Dashboard
          </Link>
        </>
      ) : (
        <div className="flex">
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
