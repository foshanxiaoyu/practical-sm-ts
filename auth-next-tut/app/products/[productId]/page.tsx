import type { Metadata, } from "next"
import Image from "next/image";

type Props = {params:{productId:string}}

export const  genrateMetadata = async ({params}:Props):Promise<Metadata> =>
{
  const titleTop = await new Promise(resolve=>{
    setTimeout(()=>{
      resolve(`XXX product${params.productId}`)
    },100)
  })
  return {
    title: { default: `Product Id - ${titleTop}`, template: "%s | My Website" }
    // title: `Product Id - ${titleTop}`
  }
}

// export async function generateStaticParams( {params,
// }:{params:{productId:string}}) {
//   const res =await fetch('https://dummyjson.com/products?limit=10')
//   const data =await res.json()
//   return data.product.productId
// }

export default async function ProductDetails({
  params,
}:{params:{productId:string}}) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`)
  const product = await res.json()
  // console.log("product ===:",product)

  return (
  <>
    <div>Detail about product  --{product.id}</div>
    <p>{product.title}</p>
    <p>{product.brand}</p>
    <Image src={product.images[0]} width={ 250} height ={210}  alt= {product.category} />
    </>
  )
}