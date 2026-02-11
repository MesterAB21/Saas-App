export const dynamic = 'force-dynamic';

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { getAllCompanion, getUserCompanion, getUserSessionHystory } from '@/lib/acrtion/companion.action';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import CompanionList from '@/components/CompanionList';
const profile = async() => {
  const user=await currentUser();
  if(!user){redirect("/sign-in")}
  const recentcompanion =await getUserSessionHystory(user.id)
  const companionUser=await getUserCompanion(user.id)
  return (
   <main className='min-lg:w-3/4'>
   <section className='flex justify-center gap-4  sm:justify-between max-sm:flex-col'>
  <div className='flex  gap-4 justify-center items-center'>

 <Image className='rounded-lg' src={user.imageUrl} alt='userImage' height={111} width={111}/>
 <div className=' flex flex-col gap-2'>

  <h1 className='font-bold text-2xl'>
   {user.fullName}
  </h1>
  <p className='text-muted-foreground text-sm'>{user.emailAddresses[0].emailAddress}</p>
 </div>

  </div>
<div className='flex gap-4  justify-center'>
<div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
   <div  className=' items center flex gap-2'>
    <Image src={"/icons/check.svg"} height={22}width={22} alt='check'/>
    <p className='text-2xl font-bold'>{recentcompanion.length}</p>
   </div>
   <div>Lesson Completed</div>
   
</div>
<div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
   <div  className=' items center flex gap-2'>
    <Image src={"/icons/cap.svg"} height={22}width={22} alt='check'/>
    <p className='text-2xl font-bold'>{companionUser.length}</p>
   </div>
   <div>Companion Created</div>
   
</div>



</div>

   </section>

    <Accordion type="multiple"  >
  <AccordionItem value="recent">
    <AccordionTrigger className='text-2xl font-bold'>Recent Sessions({recentcompanion.length})</AccordionTrigger>
    <AccordionContent className=''>
      <CompanionList  sessions={recentcompanion}/>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="recent">
    <AccordionTrigger className='text-2xl font-bold'>Session Created({companionUser.length})</AccordionTrigger>
    <AccordionContent className=''>
      <CompanionList  sessions={companionUser} titel='My Companion' />
    </AccordionContent>
  </AccordionItem>
</Accordion>
   </main>
  ) 
}

export default profile