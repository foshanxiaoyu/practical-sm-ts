'use client'

import { useRouter } from "next/navigation"

type Props = {}

const PdButton = (id: number) => {
    const router = useRouter()
    function handleClick(){
        router.push(`/products/${id}`)
    }
  return (
    <button style={{cursor:'pointer'}} onClick={handleClick}>Go to Product</button>
  )
}

export default PdButton