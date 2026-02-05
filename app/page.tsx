import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'

import { recentSessions } from '@/constants'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getAllCompanion, getSessionHistory, getUserSessionHystory } from '@/lib/acrtion/companion.action'
import { getSubjectColor } from '@/components/ui/utils'

const Page = async () => {
   const recensession=await getSessionHistory(10);
   const companions= await getAllCompanion({limit:3})
  console.log(recensession);
  return (
  
   <main  >
   <h1 className="text-2xl">Popular companion</h1>
    <section className='  home-section'>
      { companions.map((companion)=>
      (
      <CompanionCard  {...companion} key={companion.id} color={getSubjectColor(companion.subject)}/> )
    )

      }
     
    </section>   
     <section  className="home-section">
    <CompanionList  className="w-2/3 max-lg:w-full"
          sessions={recensession}></CompanionList>
        <CTA/>  


     </section>


   </main>
   
   
  )
}

export default Page