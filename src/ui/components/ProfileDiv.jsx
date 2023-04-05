import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export const ProfileDiv = ({ onOpenMenu, img, firstName, lastName, role, urlImgThumb, startLogout }) => {
    return (
        <div className={`absolute right-2 ${(onOpenMenu === true) && 'top-24' || '-top-96'} bg-white w-52 h-auto py-3 overflow-y-auto overflow-x-hidden no-scrollbar transition-all duration-500 -z-50 rounded-lg flex flex-col justify-start text-start`}>
            <Link to={'/profile'}>
                <div className='flex items-center justify-center flex-col'>
                    <div className={`w-16 h-16 overflow-hidden rounded-full flex justify-center items-center`}>
                        <img src={urlImgThumb} className='w-full rounded-full' />
                    </div>
                    <h1 className='text-slate-900 font-medium mt-3'>{firstName} {lastName}</h1>
                    <p className='text-sm mb-1 text-slate-800'>{((role === 'ADMIN_ROLE' && 'Admin') || (role === 'USER_ROLE' && 'User'))}</p>
                </div>
            </Link>
            <NavLink to={'/settings'} className='mr-2 font-normal text-black py-3 w-full inline-block hover:bg-violet-100'><i className="fa-solid fa-gear mr-5 ml-5"></i>Settings</NavLink>
            <button className='mr-2 font-normal text-black py-3 w-full inline-block hover:bg-violet-100 text-start' onClick={startLogout}><i className="fa-solid fa-arrow-right-from-bracket mr-5 ml-5"></i>Logout</button>
        </div>
    )
}
