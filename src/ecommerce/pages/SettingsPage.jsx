

import React from 'react'
import { Footer, Navbar } from '../../ui/components'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'




const SettingsPage = () => {


    const { status, user, errorMessage, } = useSelector(state => state.auth)


    return (
        <>
            <Navbar />
            <div className='relative h-auto mb-32 lg:max-w-4xl flex flex-col md:flex-row mr-auto ml-auto top-2 md:px-10'>
                <div className='md:w-56 relative mb-8 md:mb-0 mt-10 md:px-0 text-start md:text-start flex justify-center'>
                    <div className='w-80'>
                        <h1 className='font-normal text-[24px]'>Settings</h1>
                        <h1 className='font-normal text-[24px] mt-4'>Billing</h1>
                        <div className='mt-5 mb-2'>
                            <Link className='border-l-2 hover:text-green-500 pl-3 text-gray-500' to={'billings'}><i className="fa-regular fa-credit-card mr-2"></i>Billing & Payments</Link>
                        </div>
                        <h1 className='font-normal text-[24px] mt-4'>User Settings</h1>
                        <div className='mt-5 mb-2 flex flex-col'>
                            <Link to={'/profile'} className='border-l-2 hover:text-green-500 pl-3 text-gray-500 py-[6px]'><i className="fa-regular fa-user mr-2"></i>My Profile</Link>
                            <Link to={'cart'} className='border-l-2 hover:text-green-500 pl-3 text-gray-500 py-[6px]'><i className="fa-solid fa-bag-shopping mr-2"></i>Cart</Link>
                            <Link className='border-l-2 hover:text-green-500 pl-3 text-gray-500 py-[6px]' to={'profile'}><i className="fa-solid fa-gears mr-2"></i>Profile Settings</Link>
                            <Link className='border-l-2 hover:text-green-500 pl-3 text-gray-500 py-[6px]' to={'password'}><i className="fa-solid fa-lock mr-2"></i>Password & Security</Link>
                            <Link className='border-l-2 hover:text-green-500 pl-3 text-gray-500 py-[6px]' to={'notifications'}><i className="fa-regular fa-bell mr-2"></i>Notifications Settings</Link>
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default SettingsPage
