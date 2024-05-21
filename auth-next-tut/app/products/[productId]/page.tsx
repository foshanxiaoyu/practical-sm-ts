import { Metadata } from "next"

type Props = {params:{productId:string}}

export const  genrateMetadata = async ({params}:Props):Promise<Metadata> =>{
  const titleTop = await new Promise(resolve=>{
    setTimeout(()=>{
      resolve(`XXX product${params.productId}`)
    },100)
  })
  return {
    title: `Product Id - ${titleTop}`
  }
}

export default function page({
  params,
}:{params:{productId:string}}) {
  return (
    <div>Detail about product  --{params.productId}</div>
  )
}