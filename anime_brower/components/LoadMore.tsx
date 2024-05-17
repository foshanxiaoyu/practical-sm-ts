'use client'
import fetchAnime from "@app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer' // 用到 hook
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2
function LoadMore() {
  const { ref, inView } = useInView() // ref 触法参照，触法条件
  const [data, setData] = useState<AnimeProp[]>([])

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => setData([...data, ...res]))
      page++
      // alert('Load More.') // 测试触法
    }
  }, [inView, data])
  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {/* data数据可来自 API 或 数据库,特别注意在AnimeCard中的 Prop 定义 */}
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
