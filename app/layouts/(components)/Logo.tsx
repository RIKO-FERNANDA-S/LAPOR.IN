import React from 'react'
import Image from "next/image";
import logo from "../../../public/logo/logo.png";
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className='flex gap-5 items-center font-semibold text-2xl'>
        <Image src={logo} alt='logo' className='w-10'/>
        <h1>LaporIn</h1>
    </Link>
  )
}

export default Logo