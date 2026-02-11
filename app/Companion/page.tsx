export const dynamic = 'force-dynamic';

import CompanionCard from '@/components/CompanionCard';
import Searchinput from '@/components/Searchinput';
import SubjectFilter from '@/components/SubjectFilter';
import { getSubjectColor } from '@/components/ui/utils';
import { getAllCompanion } from '@/lib/acrtion/companion.action';
import React from 'react'



const   Companion= async({searchParams}:SearchParams)=>{
 const filter=await searchParams;
 const subject= filter.subject? filter.subject:"";
 const topic=filter.topic? filter.topic:"";


  const  companion =await getAllCompanion({subject,topic});
  return (
   <main>
    <section className="flex-col    justify-center items-center  w-full  ">
        <div className=' flex justify-between  '>

<h1 className=''>Companion Liberery</h1>
<div className='flex   justify-center items-center gap-4 '>
 <div className='w-1/2'> <Searchinput /></div>
 <div className='w-1/2'><SubjectFilter/></div>
        </div>

</div>
<div className='mt-5 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  max-sm:flex-cols  sm:gap-8  max-sm:space-y-3   w-full '>
{

companion.map((companion)=>(
<CompanionCard {...companion} key={companion.id} color={getSubjectColor(companion.subject)} />
))}
  
  
</div>

    </section>
   </main>
  )
}


export default Companion