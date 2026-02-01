import { auth } from "@clerk/nextjs/server"
import { createClient } from "@supabase/supabase-js"

export const CreatSupabaseClient=()=>{
return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    { async accessToken(){ return (await auth()).getToken()}}
)
}