'use client'
import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import Image from "next/image"
import { Transform } from "stream"
import { useRouter } from "next/navigation"
import { updateSearchParams } from "@utils"


export interface customFilerProps {
  title: string,
  options: OptionProps[],
}
export interface OptionProps {
  title: string,
  value: string,
}



const CustomFiler = ({ title, options }: customFilerProps) => {
  const [selected, setSelected] = useState(options[0])// 存储所选选项的状态
  const router = useRouter()

  // 更新 URL 搜索参数并导航到新 URL
  const handleUpdateSearchParams = (e :{title:string,value:string})=>{
    const newPathName = updateSearchParams(title,e.value.toLowerCase())
    router.push(newPathName)
  }


  return (
    <>
      <div className=" w-fit">
        {/* filter list   */}
        <Listbox
          value={selected}
          onChange={(e) => {
            setSelected(e);// updata the selected option
            handleUpdateSearchParams(e);
          }}  
        >
          <div className="relative w-fit z-10">
            {/* Button for the listbox */}
            <Listbox.Button className='custom-filter__btn'>
              <span className=" block truncate">{selected.title}</span>
              <Image src='/chevron-up-down.svg' width={20} height={20} alt='chevron up down' />
            </Listbox.Button >

            {/* 显示选项的转换 */}
            <Transition
              as={Fragment} // 将多个元素分组，而不引入额外的 DOM 节点，即 <></>
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              // show={true}
            >
              <Listbox.Options className="custom-filter__options" >
                {/* 映射选项并将其显示为列表框选项 */}
                {options.map((option) => (
                  <Listbox.Option
                   key={option.title} 
                   value={option} 
                   className={({active})=>` relative cursor-default 
                   select-none py-2 px-4 
                   ${active
                    ?  "bg-primary-blue text-white" 
                    : "text-gray-900"}`}
                   >
                    {({ selected }) => (
                      <>
                      <span className={`block truncate 
                      ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>

                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox >
      </div>
    </>
  )
}

export default CustomFiler