'use server'
import { auth } from "@clerk/nextjs/server"
import { CreatSupabaseClient } from "../supabase";
import Companion from "@/app/Companion/page";
import { error } from "console";


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
export const  getAllCompanion=async ({limit=10,page=1,subject,topic}:GetAllCompanions)=>{
const supabase=await CreatSupabaseClient();
let query=  supabase.from("Companion").select();
if(subject && topic ){
    query= query.ilike('subject',`%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
}
else{
    if(subject){
        query=query.ilike('subject',`%${subject}%`);
    }
    else{
        if(topic){
            query= query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
        }
    }
}
const from = (page - 1) * limit
const to = from + limit - 1
const { data:companion, error } = await query.range(from, to);

if(error) throw new Error(error.message? error.message:"Error in Searching") ;
return(companion);
}
export const getCompanion= async(id:string)=>{
    const supabase =  CreatSupabaseClient();
    const {data,error}=await supabase.from('Companion').select().eq("id",id);
    if(error){throw new Error(error.message,)};
    console.log(data);
     return data[0];
} 
export const addtHistory=async(id:string)=>{
    const supabase=CreatSupabaseClient();
    const  user=await auth()
    const {data,error}=await supabase.from('session_history').insert({
        companion_id:id,
        user_id:user.userId,
    })
    if(error) throw new Error(error.message);
    return data

}
export const getSessionHistory=async(limit=10)=>{
    const supabase=CreatSupabaseClient();
    const {data,error}=await supabase.from('session_history').select(`Companion:companion_id (*)`).order('created_at',{ascending:false}).limit(limit);
    if(error) throw new Error(error.message);
   return data.map(row => row.Companion)
}
export const getUserSessionHystory=async(user_id:string,limit=10)=>{
 const supabase=CreatSupabaseClient();
    const {data,error}=await supabase.from('session_history').select(`Companion:companion_id (*)`).eq("user_id",user_id).order('created_at',{ascending:false}).limit(limit);
    if(error) throw new Error(error.message);
     return data.map(row => row.Companion)

}
export const getUserCompanion=async(userid:string)=>{
    const supabase=CreatSupabaseClient();
    const {data,error}=await supabase.from('Companion').select().eq('author',userid)
     if(error) throw new Error(error.message);
     return data.map(row => row)
}
export const VerificationSub=async()=>{
const {userId,has}=await auth();
let limit=0;
if(has({plan:"master"}))return true
else{
    if(has({feature:"3_active_companion"})) limit=3;
    else{if(has({feature:"10active_companion"}))limit=10;}
}
const supabase=CreatSupabaseClient();
const {data,error,count}=await supabase.from("Companion").select('id',{count:"exact"}).eq("author",userId);
if(error) throw new Error(error.message);
   if(limit<=count!){return false}
   else return true

}