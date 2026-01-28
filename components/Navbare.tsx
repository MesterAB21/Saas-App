import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItem from './NavItem'

const Navbare = () => {
  return (
    <nav className='navbar'>

      <Link href="/"> 
      <div className='flex  items-center  gap-2.5 cursor-move'>
      <Image  src="/images/logo.svg" alt="logo" height={45} width={45} ></Image>
      
      </div>
      </Link>
      <div className='flex center-items gap-7'>
      <NavItem></NavItem>
      </div>








    </nav>
  )
}

export default Navbare