import React from 'react'
import { Link } from 'react-router-dom'

export const Ads = () => {
    return (
        <>
            <div className='flex flex-col colorMain items-center py-[40px] px-[80px] text-center md:h-[411px] md:justify-center'>
                <h1 className='font-bold text-sky-500 text-[50px] mb-8 leading-2'>Winter Clearance Event</h1>
                <h1 className='font-bold text-white text-[46px]'>US $3 off every $30 spent
                    <span className='block'>(max $9)</span> </h1>
                    <Link to={'/search'} className='p-4 bg-white font-semibold mt-2 md:mt-10 text-xl hover:bg-black transition-all duration-500 hover:text-white'>VIEW MORE</Link>
            </div>
        </>
    )
}
