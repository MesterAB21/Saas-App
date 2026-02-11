import CompanionForm from '@/components/CompanionForm'
import { VerificationSub } from '@/lib/acrtion/companion.action'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const dynamic = 'force-dynamic'

 const newCompanion = async () => {
    const  {userId}= await auth();
    const isValid= await VerificationSub();
  if(!userId) redirect("/sign-in");
  return (
    <main className='lg:w-1/3 md:w-2/3     '>
     { isValid ?(

      <article className='flex-row  justify-center items-center space-y-3'>
        <h2 className='font-bold  text-2xl'>Companion Build</h2>
<CompanionForm/>
      </article>
     ):
      (
        <article className='companion-limit '>
         <Image src={"/images/limit.svg"} alt='Limit Attended' height={200}width={200}/>
         <div className='cta-badge'>
          Upgrade your plane
         </div>
         <h1>You have reached your Limit</h1>
      
         <p>You have reached your Companion limit .Upgrade to create mor companion and premuim features</p>
         <Link  href={"/Subscription"} className='btn-primary bg-red-600 w-full justify-center'>
 Upgrade My Plane        
         </Link>
        </article>
      )
     

     }


    </main>
  )
}

export default newCompanion