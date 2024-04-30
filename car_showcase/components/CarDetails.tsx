import { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
import { carProps } from './CarCard'
import { relative } from "path";

type CarDetailsProps = {
    isOpen: boolean,
    closeModel: () => void,
    car: carProps
}

function CarDetails({ isOpen, closeModel, car }: CarDetailsProps) {

    return (
        <>
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
                                <Dialog.Panel className='relative w-full
                                 max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl
                                  bg-white text-left shadow-xsl transition-all flex flex-col gap-5'>
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
                                        <div className="relative w-full h-40 bg-pattern pattern-dots bg-cover rounded-lg" >

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