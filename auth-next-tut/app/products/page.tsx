import PdCard from "@/components/PdCard";
import Link from "next/link"

// https://dummyjson.com/docs/products  API fetch Data

/**
 * fetch('https://dummyjson.com/products?limit=10)
 * .then(res=>res.json())
 * .then(console.log)
 */
type product_1Props = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  brand:string,
}
async function getProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=10")
    const data = res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function ProductList() {
  // let NoLoadArry = true;
  const products_1 = await getProducts()
  // console.log("products_1 ====:", products_1)
  // if (products_1 != null)
  //   NoLoadArry = false
  return (
    <>
      <div className=" align-middle justify-center text-center font-bold "><p>产品列表</p>
        {products_1 ? (
          products_1.products.map((item: product_1Props, idx: number) => (
            <>
              <div key={idx} className=" w-1/3 " >
                <Link href ={ `/products/${item.id}`} as={`/products/${item.id}`} >
                <PdCard >
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                </PdCard>
                </Link>
              </div>
              <p  >He asdfasd alsdfjk;adfjp; eiwojfakdjpjfn</p>
              </>
          ))
        ) : (
          <div>
            <PdCard>没拿到数据。</PdCard>
          </div>
        )}
      </div>
    </>
  )
}
//  const products =
//   [
//     {id:1,name:"blue",height:'234232'},
//     {id:2,name:"red",height:'34211'},
//     {id:3,name:"green",height:'523412'}
//   ]

// return (
//   <div>
//       <h1>ProductList</h1>
//   { products.map((p,i)=>
//      <Link key={i} href={`/products/${p.id}`} as={`/products/${p.id}`}> <h2>Product Name - :{p.name} {p.id}</h2> </Link>
//      )}
//      {/* <Link href="/products/[id]" as= {`/products/${id}`}> <h2>Product 1</h2> </Link> */}


//   </div>
// )
