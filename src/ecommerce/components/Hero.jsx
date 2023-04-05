import React from 'react'
import { Link } from 'react-router-dom'
import logo from './img/logo.png'

export const Hero = () => {
  return (
    <>
        <div className='relative flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover h-[90vh] img-hero'>
            <div className='flex flex-col relative w-[350px] h-[350px] bg-white rounded-full text-center text-black items-center'>
                <img src={logo} alt={`hero logo of carey`} className='w-[210px] mt-9' />
                <h1 className='font-bold text-[2.7rem] '>Best prices</h1>
                <h1 className='font-bold text-[2.2rem] text-violet-700'>For everyone</h1>
                <Link to={'/search'} className={'buttonImage text-base py-3 px-11 border-none bg-center bg-no-repeat bg-cover text-white font-bold'}>Search Now</Link>
            </div>
        </div>
    </>
  )
}
