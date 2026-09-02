import { Button } from '@/components/ui/button'
import React from 'react'

function HeroSec() {
  return (
    <section className='w-full h-[80vh] flex justify-center items-center'>
      <div className='w-1/3 flex flex-col gap-5'>
        <h1 className='text-black leading-16 font-bold text-5xl'>Navigating the digital landscape for success</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
        <Button className="bg-blue-400 text-white font-semibold rounded-xl text-xl py-8 px-16 w-max">Mulai Sekarang</Button>
      </div>
      <div className='w-1/2'>

      </div>
    </section>
  )
}
export default HeroSec