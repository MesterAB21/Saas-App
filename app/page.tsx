import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'

import { recentSessions } from '@/constants'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'

const Page = () => {
  return (
  
   <main  >
   <h1 className="text-2xl">Popular companion</h1>
    <section className='  home-section'><CompanionCard {...recentSessions[1]} /> 
     <CompanionCard  {...recentSessions[5]} />
    <CompanionCard 
     {...recentSessions[0]}
    /></section>   
     <section  className="home-section">
    <CompanionList  className="w-2/3 max-lg:w-full"
          sessions={recentSessions}></CompanionList>
        <CTA/>  


     </section>


   </main>
   
   
  )
}

export default Page