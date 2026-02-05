"use client"
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';


const Searchinput = () => {

    const path=usePathname();

    const route=useRouter();
const searchparams=useSearchParams();
const query=searchparams.get('topic')||"";
const [searchQuery,setSearchQuery]=useState(query);

useEffect(()=>{
    const delay=setTimeout(()=>{if(searchQuery){

    const newUrl = formUrlQuery({
   params: searchparams.toString(),
   key: "topic",
   value: searchQuery,
 });
 
 route.push(newUrl);
}
else{
    const newUrl = removeKeysFromUrlQuery({
  params: searchparams.toString(),
  keysToRemove: ["topic"],
});

route.push(newUrl, { scroll: false });
}},500)

},[searchQuery,path,route]);


  return (
   <div className="flex gap-2 border rounded-xl  p-2 border-black  ">
    <Image height={15} width={15} src="icons/search.svg" alt="Search ICon"  />
    <input placeholder='Search topic' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className='border-none input outline-none' />
   </div>
  )
}

export default Searchinput