// import { data } from "./_data";
/*
 data的API格式可REF：https://shikimori.one/api/doc/1.0/animes/index
*/
import AnimeCard ,{AnimeProp} from "@components/AnimeCard";
import LoadMore from "@components/LoadMore";
import fetchAnime from "./action";



async function Home() {
  /*
  // 从api fetch数据 设置一个触法条件来更改Page值 
  npm i react-intersection-observer 这个包来设置判断条件
  初始数据时可设置page=1,
  */
  const data = await fetchAnime(1); 
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
    <h2 className="text-3xl text-white font-bold">探索动漫</h2>

    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {/* data数据可来自数据库,特别注意在AnimeCard中的 Prop 定义 */}
      {/* {data.map((item: AnimeProp, index: number) => (
        <AnimeCard key={item.id} anime={item} index={index} />
      ))} */}
      {/* 更改action.ts=>action.tsx 直接返回数据加格式后,在page=>HOME直接拿data */}
      {data}
    </section>
    <LoadMore />
  </main>

  );
}

export default Home
