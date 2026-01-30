import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface companionCardProps {
    id:number;
    name:string;
    topic:string;
    subject:string;
    duration:number;
    color:string;
}
const CompanionCard = ({id,name,topic,subject,duration,color}:companionCardProps) => {
  return (
    <article className='companion-card' style={{background:color}}>
   <div className='flex justify-between items-center'>
    <div className='subject-badge'>{subject}</div>
    <button className='companion-bookmark'><Image src="/icons/bookmark.svg" alt="bookmark" width={13} height={17.5}></Image> </button>
   </div>
   <h2 className='text-2xl font-bold'>{name}</h2>
   <p className='text-sm'>{topic}</p>
   <div className='flex gap-2.5 items-center'>
    <Image src="/icons/clock.svg" alt="clock" height={10} width={11}></Image>
    <p className='text-sm'>{duration}minutes</p>
   </div>
   
<Link className='w-full' href={`/companion/${id}`}>
   <button className='btn-primary w-full justify-center' >Lunch Lesson</button>
</Link>   
    


    </article>
  )
}

export default CompanionCard