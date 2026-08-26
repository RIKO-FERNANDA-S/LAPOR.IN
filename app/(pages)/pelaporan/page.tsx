import React from 'react'
import Image from 'next/image'
import park from "@/public/image/park.jpeg"
import { Label } from '@/components/ui/label'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

function Form() {
  return (
    <main className='w-full h-screen flex justify-center items-center '>
        {/* <Image src={park} alt='allow' className='relative w-full h-screen blur-xs'></Image> */}
        <div className='absolute'>
            <Field>
                <FieldLabel>
                    Kendala
                </FieldLabel>
                <Input placeholder='Isikan kendala yang anda alami'/>
            </Field>
        </div>
    </main>
  )
}

export default Form