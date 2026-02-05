"use client"
import React, { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from './ui/utils'
import { vapi } from '@/lib/vapi';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json'
import Vapi from '@vapi-ai/web';
import { addtHistory } from '@/lib/acrtion/companion.action';
enum CallStatue{
    INACTIVE="INACTIVE",
    ACTIVE="ACTIVE",
    CONNECTING="CONNECTING",
    FINISHED="FINISHED"
}
const CompanionVoicSession =({companionId,voice,style,name,topic,subject,userName,userImage}:CompanionComponentProps) => {
    const [speech, setspeech] = useState(false)
    const lottiref=useRef<LottieRefCurrentProps>(null)
    const [callStatue, setcallStatue] = useState<CallStatue>(CallStatue.INACTIVE);
    const [mic, setmic] = useState(vapi.isMuted());
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const toggelMic=()=>{
        if(callStatue===CallStatue.ACTIVE){

            vapi.setMuted(!mic);
            setmic(!mic);
        }
    }

    useEffect(()=>{

    if(speech){
        lottiref.current?.play();
    }else{
        
        lottiref.current?.stop();


}
    },[speech])
    useEffect(()=>{

        const oncallstart=()=>setcallStatue(CallStatue.ACTIVE);
        const oncallEnd=()=>{setcallStatue(CallStatue.FINISHED)
             addtHistory(companionId)
        };
        const onmessage=(message:Message)=>{ if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage= { role: message.role, content: message.transcript}
                setMessages((prev) => [newMessage, ...prev])
            }}
        const onspeechstart=()=>{setspeech(true)};
        const onspeechend=()=>{setspeech(false)};
        const onerror=(error:Error)=>{console.log(error)};
        vapi.on('call-end',oncallEnd);
        vapi.on('call-start',oncallstart)
        vapi.on('error',onerror);
        vapi.on('message',onmessage);

        vapi.on('speech-start',onspeechstart)
        vapi.on('speech-end',onspeechend)
        return()=>{ 
        vapi.off('call-end',oncallEnd);
        vapi.off('call-start',oncallstart);
        vapi.off('error',onerror);
        vapi.off('message',onmessage);
        vapi.off('speech-start',onspeechstart)
        vapi.off('speech-end',onspeechend)
        }
    },[])
    const handelDisconict=()=>{ setcallStatue(CallStatue.FINISHED)
        vapi.stop()}
    const handelConnect=async()=>{const assistanOverrides={
        variableValues:{subject,topic,style},
        clientMessages:['transcript'],
        serverMessages:[],
    }
    //@ts-expect-error
    setcallStatue(CallStatue.CONNECTING)
        vapi.start(configureAssistant(voice,style),assistanOverrides);
       
}
      return (
    <section className='flex flex-col h-[70vh]'>
        <section className='flex gap-8 max-sm:flex-col'>
           <div className='companion-section'>
            <div className='companion-avatar' style={{backgroundColor:getSubjectColor(subject)}}>
             <div className={cn('absolute transition-opacity duration-1000 ',callStatue ===CallStatue.FINISHED || callStatue===CallStatue.INACTIVE ? 'opacity-100':'opacity-0',callStatue===CallStatue.CONNECTING && "opacity-100 animate-pulse" )}>
               
                    <Image src={`/icons/${subject}.svg`} alt={subject} height={150} width={150} className={cn( subject=="economics"?' max-sm:w-16 max-sm:h-fit':'max-sm:w-fit')}></Image>
             </div>
                <div className={cn('absolute transition-opacity duration-1000',speech ? 'opacity-100':'opacity-0')}>
                    <Lottie    
                    
                    lottieRef={lottiref}
                    animationData={soundwaves}
                    autoPlay={false}
                    className='companion-lottie'
                    />

                    
                </div>
            </div>
             <p className='text-2xl font-bold'>{name}</p>
           </div>
           <div className=' user-section  '>
            <div className='user-avatar max-sm:hidden'>
                <Image className='rounded-lg' src={userImage} height={100} width={100} alt="user Image"/>
                <p className='font-bold text-xl'>{userName}</p>
            </div>
             <button className='btn-mic' onClick={toggelMic}>
                 <Image src={mic? '/icons/mic-off.svg':'/icons/mic-on.svg'}alt='mic' height={36} width={36} />
             <p className='text-lg max-sm:hidden'>{mic? "Turn on Mic":"Turn off Mic"}</p>
             </button>
             <button className={cn(' rounded-lg cursor-pointer transition-colors w-full text-white',callStatue===CallStatue.ACTIVE ?"bg-red-700":'bg-primary' ,callStatue===CallStatue.CONNECTING &&" animate-pulse")} 
                onClick={callStatue===CallStatue.ACTIVE? handelDisconict :handelConnect} >
                {callStatue===CallStatue.ACTIVE?'End Session':callStatue===CallStatue.CONNECTING?"Connecting...":"Start Session"}
             </button>
           </div>
        </section>
        <section className='transcript'>
            <div className='transcript-message no-scrollbar'>
                {messages.map((message, index) => {
  if (message.role === 'assistant') {
    return (
      <p key={index} className=" text-lg max-sm:text-sm">
        {name.split(' ')[0].replace(/[.,]/g, '')}: {message.content}
      </p>
    );
  }

  return (
    <p key={index} className=" text-lg text-primary max-sm:text-sm">
      {userName}: {message.content}
    </p>
  );
})}
            </div>
        </section>

    </section>
  )
}

export default CompanionVoicSession