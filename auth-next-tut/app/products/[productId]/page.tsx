import type { Metadata, } from "next"
import Image from "next/image";

type Props = { params: { productId: string } }

type reviewsProp = {
  rating: number,
  comment: string,
  date: Date,
  reviewerName: string,
  reviewerEmail: string,
}

export const genrateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const titleTop = await new Promise(resolve => {
    setTimeout(() => {
      resolve(`XXX product${params.productId}`)
    }, 100)
  })
  return {
    title: { default: `Product Id - ${titleTop}`, template: "%s | My Website" }
    // title: `Product Id - ${titleTop}`
  }
}

export default async function ProductDetails({
  params,
}: { params: { productId: string } }) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`)
  const product = await res.json()
  // console.log("product ===:",product)
  return (
    <>
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      <div>Detail about product  --{product.id}</div>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.brand}</p>

      <Image src={product.images[0]} width={250} height={210} alt={product.category} />
      <div>
        <h3>Comment: </h3> 
        {product.reviews.length > 0
          // ? product.reviews.forEach((review: reviewsProp) => 
          ? product.reviews.map((review: reviewsProp) => (// console.log(review.comment);
            <div key={review.reviewerName}>
              <p>{review.comment}</p>
              <p>{review.date.toString()}</p>
              
            </div>
          ))
          : <p>木数据loading...</p>
        }
      </div>
      </section>
      {/* <div>
        {product.reviews.length > 0 ? (
          product.reviews.map((review: reviewsProp) => (
            // <div key={review.reviewerEmail}> {/* Add a unique key for each review 
               <h3>Comment:</h3>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>暂无数据...</p>
        )}
      </div> 
        */}
    </>
  )
}