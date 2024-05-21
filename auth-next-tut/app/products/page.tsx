import Link from "next/link"

type Props = {}


export default function ProductList({}: Props) {
    const products = 
    [
      {id:1,name:"blue",height:'234232'},
      {id:2,name:"red",height:'34211'},
      {id:3,name:"green",height:'523412'}
    ]
  return (
    <div>
        <h1>ProductList</h1>
    { products.map((p,i)=>
       <Link key={i} href="/products/[id]" as={`/products/${p.id}`}> <h2>Product Name-:{p.name} {p.id}</h2> </Link>
       )}
       {/* <Link href="/products/[id]" as= {`/products/${id}`}> <h2>Product 1</h2> </Link> */}

    
    </div>
  )
}