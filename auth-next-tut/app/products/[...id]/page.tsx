import { Metadata } from "next"

type Props = {params:{id:string}}

export const  genrateMetadata = async ({params}:Props):Promise<Metadata> =>{
  const titleTop = await new Promise(resolve=>{
    setTimeout(()=>{
      resolve(`XXX product${params.id}`)
    },100)
  })
  return {
    title: `Product Id - ${titleTop}`
  }
}

export default function page({
  params,
}:{params:{id:string}}) {
  return (
    <div>Detail about product  {params.id}</div>
  )
}