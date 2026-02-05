
import Link from 'next/link';
import Image from "next/image"


const CTA = () => {
  return (
 <section className="cta-section">
<div className="cta-badge"> Start learning your way.</div>
  <h2 className="text-3xl font-bolde">Bulid and personlize your companion</h2>
   <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
<Image src="/images/cta.svg" alt="Cta" height={333} width={280}/>
<Link
        href="/Companion/new"
        className="btn-primary bg-red-500 inline-flex items-center gap-2"
      >
        <Image src="/icons/plus.svg" alt="plus" height={10} width={13} />
        <span>Build a new companion</span>
      </Link>
 </section>
  )
}

export default CTA