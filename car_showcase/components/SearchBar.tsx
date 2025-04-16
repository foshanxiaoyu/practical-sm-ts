'use client'

import { useState } from "react"
import SearchManufacturer from "./SearchManufacturer"
import Image from "next/image"
import { useRouter } from "next/navigation";




const SearchButton = ({ otherClasses }: { otherClasses: string }) =>
(
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src='/magnifying-glass.svg'
      alt='maginifing glass'
      width={40} height={40} className="object-contain"
    />
  </button>
)

type Props = { title: { title: string } }

const SearchBar = ({ title }: Props) => {
  // 制造商
  const [manufacturer, setManufacturer] = useState('')
  // model 参数 API 查询参数（可变）用钩子来设置setModel()=>void
  const [model, setModel] = useState('')
  // 初始router 
  const router = useRouter()


  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("manufacturer,model",manufacturer,model)
    if(manufacturer===''&&model===''){
      return alert('Please fill in the search bar')
    }
    // 调用updataSearchParams
    updataSearchParams( model.toLowerCase(),manufacturer.toLowerCase())

  }

  const updataSearchParams =(model:string,manufacturer:string)=>{
    const searchParams = new URLSearchParams(window.location.search)//注意参数的保存点
    if(model){
      searchParams.set('model',model)
    }else{
      searchParams.delete('model') // delete key
    }
    if(manufacturer){
      searchParams.set('manufacturer',manufacturer)
    }else{
      searchParams.delete('manufacturer') // delete key
    }
    // 拿到新的API PATH 
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    //push 到 Router 中
    router.push(newPathname)
  }

  return (

    <form className="searchbar" onSubmit={handleSearch}>
      {/* 第一个search 条件 制造商(manufacturer)  */}
      <div className="searchbar__item"  >
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        {/* 放大镜按键-search  */}
        <SearchButton otherClasses='sm:hidden' />
      </div>

      {/* 第二个search 条件 model  */}
      <div className='searchbar__item '>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>

      <SearchButton otherClasses='max-sm:hidden '  />
    </form>

  )
}

export default SearchBar