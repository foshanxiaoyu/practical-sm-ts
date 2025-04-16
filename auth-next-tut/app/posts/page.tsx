import { Metadata } from "next"

export const metadata:Metadata={
    title:{
        absolute:'Posts',
    }
}
type Props = {params:{id:string}}
// Data Fetching

// 1. Server Side Rendering(SSR)
// 2. Static Site Generation(SSG)
// 3. Increnental Static Generation (ISR)

export default async function page ({params} :Props) {
    const res = await fetch(
        // `https://jsonplaceholder.typicode.com/post/${params.id}`,
        `https://jsonplaceholder.typicode.com/posts/50`,
        // {cache:'no-store'},// using cache 
        // {next:{revalidate:10}} // check time
    )
    const data = await res.json()
    console.log(data)
  return (

    <div className="grid grid-cols-6 gap-x-6 gap-y-3">
        <div className="col-span-full space-y-3 bg-slate-400 lg:col-span-4">
            <h1 className="truncate text-2xl font-medium capitalize ">
                {data.title}
            </h1>
            <p className="font-medium text-gray-500"> {data.body}</p>
        </div>
    </div>
    
  )
}
 