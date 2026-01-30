import Link from 'next/link';
import Image from "next/image"


const CTA = () => {
  return (
 <section className="cta-section">
<div className="cta-badge"> Start learning your way.</div>
  <h2 className="text-3xl font-bolde">Bulid and personlize your companion</h2>
   <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
<Image src="/images/cta.svg" alt="Cta" height={333} width={280}/>
<button className=" bg-red-500 btn-primary"> 
    <Image src="/icons/plus.svg" alt="plus" height={10} width={13}/>
<Link href="/companion/new"> <p>build a new companion</p></Link>
</button>
 </section>
  )
}

export default CTA