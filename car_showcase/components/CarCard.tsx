'use client'
import { useState } from 'react'
import Image from 'next/image'
import CustomButton from './CustomButton'
import { calculateCarRent, generateCarImageUrl } from '@utils'

export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;

}

export interface carProps {
    city_mpg: number,
    class: string,
    combination_mpg: number,
    cylinders: number,
    displacement: number,
    drive: string,
    fuel_type: string,
    highway_mpg: number,
    make: string,
    model: string,
    transmission: string,
    year: number,
}
export interface CarCardProps {
    car: carProps
}

function CarCard({ car }: CarCardProps) {

    const { city_mpg, year, make, model, transmission, drive } = car

    const carRent = calculateCarRent(city_mpg, year) //租金计算

    const [isOpen ,setIsOpen ] = useState(false)

    return (
        <div className='car-card group' >
            {/* 车类型标签 */}
            <div className='car-card__content' >
                <h2 className='car-card__content-title'>{make}{model}</h2>
            </div>
            {/* 租金渲染 */}
            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    $
                </span>
                {carRent}
                <span className='self-start text-[14px] font-medium'>
                    /day
                </span>
            </p>
            {/* 车图  api fetch */}
            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src= '/hero.png'//{generateCarImageUrl(car)} 
                    alt='car model' fill priority
                    className='object-contain' />
            </div>
            {/* 车图下三个小图及p标签 */}
            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-gray'>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
                        <p className='text-[14px]'>
                            {transmission === 'a' ? '自动波' : '手动档'}
                        </p>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/tire.svg' width={20} height={20} alt='tire' />
                        <p className='text-[14px]'>
                            {drive.toUpperCase()}
                        </p>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/gas.svg' width={20} height={20} alt='gas' />
                        <p className='text-[14px]'>
                            {city_mpg} MPG
                        </p>
                    </div>
                </div>


            </div>
            {/* 自定义按键 */}
            <div className='car-card__btn-container'>
                <CustomButton 
                title='View More' 
                containerStyles='w-full py-[16px] rounded-full bt-primary-blue'
                textStyles = 'text-white text-[14px] leading-[17px] font-bold'
                rightIcon = '/right-arrow.svg'
                handleClick={()=>setIsOpen(true)}
                />
            </div>
        </div>
    )
}

export default CarCard