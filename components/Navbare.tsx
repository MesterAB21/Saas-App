'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItem from './NavItem'
import { usePathname } from 'next/navigation'
import {
  
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { cn } from './ui/utils'
const Navbare = () => {
  const path=usePathname();
  return (
    <nav className='navbar'>

      <Link href="/"> 
      <div className='flex  justify-center items-center  gap-2.5 cursor-point'>
      <Image  src="/images/logo.svg" alt="logo" height={45} width={45} ></Image>
      
      </div>
      </Link>
      <div className='flex center-items gap-7'>
      <NavItem/>
      <SignedOut >
              <SignInButton>
                 <button className={cn(  " cursor-pointer",path === "/sign-in"&&'underline font-semibold ')}>
                  Sign In
                </button>
                </SignInButton>  
              <SignUpButton>
                <button className={cn(  " cursor-pointer",path === "/sign-in"&&'underline font-semibold ')}>
                  Sign Up
                </button>
              </SignUpButton>
             
            </SignedOut>
             <SignedIn>
                <UserButton afterSwitchSessionUrl='/'/>
              </SignedIn>
      </div>








    </nav>
  )
}

export default Navbare