import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo/logo.png"
import { Button } from "@/components/ui/button";



const session = await auth();
const user = session?.user;



function Navbar() {
  return (
    <div className="flex bg-green-300 h-24 w-full items-center justify-between gap-4 px-10">
      <Image src={logo} alt="logo" className="w-16"></Image>
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
