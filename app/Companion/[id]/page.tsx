import CompanionVoicSession from '@/components/CompanionVoicSession';
import { getSubjectColor } from '@/components/ui/utils';
import { getCompanion } from '@/lib/acrtion/companion.action'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import { redirect } from 'next/navigation'

import React from 'react'
interface CompanionPropsParam{
  params:Promise<{id:string}>;
}

const companionSession = async({params}:CompanionPropsParam) => {
  const user=await currentUser(); 
  if(!user) redirect("/sign-in");
  const {id}=await params;
   const companion=await getCompanion(id);
   if(!companion) {redirect("/Companion/new");}
   const {subject,duration,topic,name}=companion;
   
  return (
    <main>
     <article className=' flex p-4 justify-between items-center rounded-border'>
       <div className=" gap-2   flex items-center">
          <div className=''>
            <Image   src={`/icons/${subject}.svg`} alt={subject} height={ 55} width={60}  style={{backgroundColor:getSubjectColor(subject)}} className='border rounded-xl  px-4 py-2'/>
          </div>
          <div className=' flex-col  flex  '>
            <div className='flex gap-3 items-center  '>

              <h1 className='text-xl font-semibold'>
                {name}
              </h1>
               <span className='  max-sm:hidden text-sm subject-badge  '>
             {subject}
          
              
              </span>
            </div>
              <p className=' '>Topic:{topic}</p>

          </div>
          
          
            
       </div>
      <div className='text-lg'>
       {duration} minutes
      </div>
     </article>
     <CompanionVoicSession {...companion} userName={user.firstName!} userImage={user.imageUrl!}  companionId={id} />
    </main>
  )
}

export default companionSession