"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"

import { redirect } from 'next/navigation'
import { CreatCompanion } from "@/lib/acrtion/companion.action"


const formSchema = z.object({
    name:z.string().min(2,{message:"name must be at leatst 2 charachter"}),
    subject:z.string().min(2,{message:"subject is required"}),
  topic:z.string().min(2,{message:"topic is required"}),
  voice:z.string().min(2,{message:"voice is required"}),
  style:z.string().min(2,{message:"style is required"}),
  duration:z.coerce.number().min(1,{message:"duration is required"}),
  

})

 const  onSubmit = async(data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
   const dataa= await CreatCompanion(data);
   if(dataa){redirect(`/Companion/${dataa.id}`)};
  }
const CompanionForm = () => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:'',
      subject:'',
      topic:'',
      voice:'',
      style:'',
      duration:15,

    },
  })
    return (
    
   <Form {...form} >
            <form   onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Enter the companion name"
                                    {...field}
                                    className="input w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className=" text-right">Subject</FormLabel>
                            <FormControl  >
                               <Select  onValueChange={field.onChange} value={field.value}  defaultValue={field.value} >
                                <SelectTrigger  className="input ">
                                    <SelectValue placeholder="Select a subject"/>
                                </SelectTrigger>
                                 <SelectContent >

                                    {subjects.map((subject)=>(
                                        <SelectItem className="  capitalize " value={subject} key={subject}> {subject}</SelectItem>
                                    ))

                                    }
                                 </SelectContent>

                               </Select>
                            </FormControl>
                           <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> What should Companion Help with</FormLabel>
                            <FormControl>
                            <Textarea {...field}
                            className="input " placeholder="Integrals & Derivative">
                             
                            </Textarea>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                           <Select  onValueChange={field.onChange} value={field.value}  defaultValue={field.value} >
                                <SelectTrigger  className="input ">
                                    <SelectValue placeholder="Select voice"/>
                                </SelectTrigger>
                                 <SelectContent >

                                  <SelectItem className="  capitalize " value="male" > male</SelectItem>
                                        <SelectItem className="  capitalize " value="female" > female</SelectItem>
                                    
                                 </SelectContent>

                               </Select>
                               <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>style</FormLabel>
                              <Select  onValueChange={field.onChange} value={field.value}  defaultValue={field.value} >
                                <SelectTrigger  className="input ">
                                    <SelectValue placeholder="Select a  style"/>
                                </SelectTrigger>
                                 <SelectContent >

                                  <SelectItem className="  capitalize " value="casual" > casual</SelectItem>
                                        <SelectItem className="  capitalize " value="formal" > formal</SelectItem>
                                    
                                 </SelectContent>

                               </Select><FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated duration of the Session</FormLabel>
                            <FormControl>
                                <Input type="number" 
                                    placeholder="Enter the duration in minutes"
                                    {...field}
                                    className="input w-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="cursor-pointer  w-full hover:opacity-90 hover:scale-105 transition-transform">Build your companion</Button>
                 </form> 
               
                </Form>
  )
}

export default CompanionForm