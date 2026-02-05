"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from '@/constants'
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
const SubjectFilter = () => {
    
    
        const path=usePathname();
    
        const route=useRouter();
    const searchparams=useSearchParams();
    const query=searchparams.get('topic')||"";
    const [searchQuery,setSearchQuery]=useState("");
    
    useEffect(()=>{
       
        if(searchQuery==="All"){
        const newUrl = removeKeysFromUrlQuery({
      params: searchparams.toString(),
      keysToRemove: ["subject"],
    });
    
    route.push(newUrl, { scroll: false });
    
}
       
    else{
         const newUrl = formUrlQuery({
       params: searchparams.toString(),
       key: "subject",
       value: searchQuery,
     });
     
     route.push(newUrl);
    }
},[searchQuery,path,route]);

  return (
    <div className="   h-11 border rounded-xl py-1 border-black">
        <Select   onValueChange={(value) => setSearchQuery(value)}
value={searchQuery}   >
                                <SelectTrigger  className="input  
      border-0 
      shadow-none 
      
     ">
                                    <SelectValue placeholder="Select a subject"/>
                                </SelectTrigger>
                                 <SelectContent >

                                    {subjects.map((subject)=>(
                                        <SelectItem className="  capitalize " value={subject} key={subject}> {subject}</SelectItem>
                                    ))

                                    }
                                    <SelectItem className="  capitalize " value="All" > All</SelectItem>
                                 </SelectContent>

                               </Select>
    </div>
  )
}

export default SubjectFilter