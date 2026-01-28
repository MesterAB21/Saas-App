'use client';

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const itemsnav=[
    {label:"Home"  ,href:"/"},
{label:"Companion"  ,href:"/Companion"},
{label:"My Journy"  ,href:"/my-journy"},
    {label: "Sign In" ,href:"/Sign-In"},
               ]


               
               
               const NavItem = () => {
                   const path=usePathname();
                   return (
                       <>
    {
    itemsnav.map(({label,href})=>(
        <Link  href={href} key={label}   className={cn("hover:opacity-80",path === href && ' underline font-semibold')}> {label}</Link>
    ))}
    </>
  )
}

export default NavItem