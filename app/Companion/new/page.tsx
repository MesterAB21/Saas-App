import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
 const newCompanion = async () => {
    const  {userId}= await auth();
  if(!userId) redirect("/sign-in");
  return (
    <main className='lg:w-1/3 md:w-2/3     '>
      <article className='flex-row  justify-center items-center space-y-3'>
        <h2 className='font-bold  text-2xl'>Companion Build</h2>
<CompanionForm/>


      </article>


    </main>
  )
}

export default newCompanion