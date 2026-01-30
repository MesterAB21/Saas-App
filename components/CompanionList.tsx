import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSubjectColor } from "./ui/utils";


interface CompaninonListProp{
  sessions?:Companion[];
  className?:string;
}

const CompanionList = ({sessions,className}:CompaninonListProp) => {
  return (
    
<article className={cn('companion-list',className)}>
   <h2 className="text-2xl">Recently completed lessons</h2>
<Table>
        <TableHeader className="">
          <TableRow>
          <TableHead className=" w-2/3 ">Lesson</TableHead>
          <TableHead className="">Subject</TableHead>
          <TableHead className="text-right">duration</TableHead>
            </TableRow>
           
        
        </TableHeader>
        <TableBody>
         {sessions?.map(({id,colore,duration,subject,name,topic}) =>(

              <TableRow key={id}
                
              >
                  <TableCell >
                    <Link href={`/Companion/${id}`} >
                    <div className="flex   gap-2.5 items-center " >
                      <div className="flex  rounded-lg max-lg:hidden  size-[76px]  p-1 justify-center items-center"style={{background:getSubjectColor(subject)}}>

                    <Image src={`/icons/${subject}.svg`} alt={subject} width={26} height={35} />
                      </div>
                      <div className="flex-col ">
                      <p className="font-bold max-sm:text-sm text-2xl">{name}</p>
                      <p className=" text-sm max-sm:hidden">{topic}</p>

                      </div>
                    </div>
                    
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div  >
                      <div className="flex justify-center items-center rounded-md "style={{background:getSubjectColor(subject)}}>

                      <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={12} className="md:hidden"/>
                      </div>
                      <h2 className="subject-badge text-center max-md:hidden">{subject}</h2>
                    </div>


                  </TableCell>

                  <TableCell>
                    <div className="flex items-center  justify-end gap-2.5 ">

                      <Image src="/icons/clock.svg" className="max-sm:hidden" alt="clock" width={12} height={14}/> 
                      <h3 className="duration-badge">{duration} minutes</h3>
                    </div>
                  </TableCell>
               
              </TableRow>
         ))}
           
         
        </TableBody>
      </Table>
</article>

  )
}

export default CompanionList