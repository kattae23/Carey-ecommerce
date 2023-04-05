import React from 'react'
import { useState } from 'react'

export const Notifications = () => {

    const [activeNotifications, setActiveNotifications] = useState(true);

    const activeNotificationsSet = () => {

        setActiveNotifications(!activeNotifications)

    }


    return (
        <>
            <div className='w-full transition-all duration-150'>
                <div className='w-full text-center'>
                    <h1 className='text-[26px] mb-5'>Notifications Settings</h1>
                </div>
                <div className='w-full h-full border-2 rounded-3xl transition-all duration-150'>
                    <div className='w-full h-auto border-2 rounded-3xl transition-all duration-150'>
                        <div className='flex mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] flex-center items-center justify-center'>
                            <h1 className='font-normal'>Authentication options</h1>
                        </div>
                        <div className='flex flex-col mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] px-16 transition-all duration-150'>
                            <div className=' transition-all duration-150'>
                                <div>
                                    <h1 className='mb-2'>
                                        Notifications
                                    </h1>
                                    <div className='flex items-center transition-all duration-150'>
                                        <i className="fa-solid fa-circle-check mr-5 text-green-700"></i>
                                        <div className='flex flex-col transition-all duration-150'>
                                            <h1 className='text-lg'>Notifications has been set</h1>
                                            <p className='text-gray-500 text-base'>Choose</p>
                                            <div onClick={activeNotificationsSet} className='w-[50px] bg-black h-[25px] rounded-full flex items-center relative transition-all duration-300'>
                                                <div className={`w-[15px] h-[15px] bg-white rounded-full absolute ${((activeNotifications === true && 'left-1' || 'right-1'))}    transition-all duration-300`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full justify-center flex'>
                                <button className='py-2 px-5 rounded-md text-white hover:bg-[#9739df] bg-[#2f9445]'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
