'use client'

import { useState } from "react"
import SearchManufacturer from "./SearchManufacturer"

type Props = {title:{title:string}}
const SearchBar = ({title}:Props) => {
    const [manufacturer,setManufacturer] = useState('')

    const handleSearch = ()=>{

    }
  return (
    
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item"  >
        <SearchManufacturer 
            manufacturer={manufacturer}
            setManufacturer = {setManufacturer}
        />

        </div>
        <input type="text" />
    </form>

  )
}

export default SearchBar