import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { carProps } from './CarCard'
import { generateCarImageUrl } from "@utils";

type CarDetailsProps = {
    isOpen: boolean,
    closeModel: () => void,
    car: carProps
}

function CarDetails({ isOpen, closeModel, car }: CarDetailsProps) {

    return (
        <>
            {/* Transition 过渡 */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModel}>
                    <Transition.Child
                        as={Fragment} // 动漫态
                        enter="ease-out duration-300" //进入时 缓出持续时间-300
                        enterFrom="opacity-0" // 从透明度 0
                        leave="ease-in duration-200" //离开时 缓入持续时间-200
                        leaveFrom="opacity-100" // 离开时  从透明度100
                        leaveTo="opacity-0" // 离开时  到透明度 0
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25">
                        </div>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacityy-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {/* 弹出对话 Panel  */}
                                <Dialog.Panel className='relative w-full
                                 max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl
                                  bg-white p-6 text-left shadow-xsl transition-all flex flex-col gap-5'>
                                    {/* 跳出对话右上角关闭按键 */}
                                    <button
                                        type="button"
                                        onClick={closeModel}
                                        className="absolute top-2 right-2 z-10 w-fit
                                         p-2 bg-primary-blue rounded-full"
                                    >
                                        <Image className="object-contain" src='/close.svg' width={20} height={20} alt="close" />
                                    </button>
                                    {/* 弹出对话框容器 */}
                                    <div className=" flex-1 flex flex-col">
                                        {/* 放入Fitch所得车辆的照片*/}
                                        <div className="relative w-full h-40 bg-pattern bg-cover rounded-lg" >
                                            <Image src='/carModel.png' alt="car-photo" //{generateCarImageUrl(car,'angle')} API get 图
                                                fill priority className="object-contain" />
                                        </div>

                                        {/* 在这个图片下还要放入三个小的不同角度图片 */}
                                        <div className="flex gap-3">
                                            {/* 小图一 */}
                                            <div className="flex-1  relative w-full h-24
                                                 bg-primary-blue-100 rounded-lg">
                                                <Image src='/carModel.png' alt="car-model" //generateCarImageUrl(car,'13')}
                                                    fill priority className="object-contain" />
                                            </div>
                                            {/* 小图二 */}
                                            <div className="flex-1  relative w-full h-24
                                                 bg-primary-blue-100 rounded-lg">
                                                <Image src='/carModel.png' alt="car-model"
                                                    fill priority className="object-contain" />
                                            </div>
                                            {/* 小图三 */}
                                            <div className="flex-1  relative w-full h-24
                                                 bg-primary-blue-100 rounded-lg">
                                                <Image src='/carModel.png' alt="car-model"
                                                    fill priority className="object-contain" />
                                            </div>
                                        </div>
                                    </div>
                                    {/**图片下的具体性能或属性列式渲染 */}
                                    <div className=" flex-1 flex flex-col gap-2">
                                        {/*product model  */}
                                        <h2 className="font-semibold text-xl capitalize">{car.make}{car.model}</h2>
                                        <div className=" mt-3 flex flex-wrap gap-4">
                                            {/* 对象键和值的map  */}
                                            {Object.entries(car).map(([key,value])=>(
                                                <div className=" flex justify-between gap-5 
                                                 text-right w-full" key={key}>
                                                    <h4 className=" text-gray capitalize">{key.split('_').join('')}</h4>
                                                    <p className=" text-black-100 font-semibold">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel >
                            </Transition.Child >
                        </div>

                    </div>

                </Dialog>
            </Transition>
        </>
    )
}

export default CarDetails