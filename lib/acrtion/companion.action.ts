'use server'
import { auth } from "@clerk/nextjs/server"
import { CreatSupabaseClient } from "../supabase";


export  const   CreatCompanion= async (form:CreateCompanion)=>{
   
const {userId:author}= await auth();
const supabase=CreatSupabaseClient();
const {data,error}=await supabase.from('Companion').insert({...form,author}).select();
if(error||!data ) { 
    throw new Error(error?.message||'Failed to create Companion');
   
}
else{
    return (data[0]);
}
}