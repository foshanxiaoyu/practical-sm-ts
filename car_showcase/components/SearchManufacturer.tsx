'use client'
import { manufacturers } from "@constants"
import { useState, Fragment } from "react"
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { strict } from "assert"

type SearchManufacturerProps = {
  manufacturer: string,
  setManufacturer: (manufacturer: string) => void,
}

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {

  const [query, setQuery] = useState('')

  const filteredManufacturers =
    query == ''
      ? manufacturers // 引入常数对象
      : manufacturers.filter((item) => (
        item.toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      ))

  return (
    <div className="serch-manufacturer">
      {/* manufacturer setManufacturer 用来传值 */}
      <Combobox value={manufacturer} onChange={setManufacturer}> 
        <div className="relative w-full">
          <Combobox.Button className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='absoute top-[14px] ml-4' alt='Car logo' />
          </Combobox.Button>
          <Combobox.Input
            className='search-manufacturer__input'
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== ''
                ? ( // 过滤数据长度为0 and query有数据
                  <Combobox.Option
                    value={query}
                    className='search-manufacturer__option'
                  >
                    Create "{query}" --- 测试新名能否生成
                  </Combobox.Option>
                )
                : (
                  filteredManufacturers.map((item) => (
                    <Combobox.Option
                      key={item}
                      className={({ active }) => `
                    relative search-manufacturer__option
                    ${active
                          ? 'bg-primary-blue text-white'
                          : 'text-gray-900'}
                    `}
                      value={item}
                    >
                      {/*  https://headlessui.com/react/combobox  原网页中两中状态 */}
                      {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                    </Combobox.Option>
                  ))

                )
              }
            </Combobox.Options>
          </Transition>

        </div>
      </Combobox>
      {/* {filteredManufacturers.length===0 && query !==""
       ? (`Create ${query}`)
       :(filteredManufacturers.map((item)=>(
        <span>{item}</span>
       )))
       } SearchManufacturer */}
    </div>
  )
}

export default SearchManufacturer