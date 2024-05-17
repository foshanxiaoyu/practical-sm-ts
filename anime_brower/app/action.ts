
const fetchAnime = async (page:number)=>{
   const  apiUrl = `https://shikimori.one/api/animes?page=${page}&limit=12&order=popularity`
    const res = await fetch(apiUrl)
    const data = await res.json()
    // console.log(data) // 查看数据结构和fatch结果
    return data
}

export default fetchAnime