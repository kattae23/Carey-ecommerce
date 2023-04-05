import React from 'react'
import { Link } from 'react-router-dom'
import app from '../../ecommerce/components/img/pay/app-store.png'
import play from '../../ecommerce/components/img/pay/play-store.png'
import logo from '../../ecommerce/components/img/logo.png'



export const Footer = () => {
  return (
    <>
      <div className='relative bottom-0 grid grid-cols-2 grid-rows-2 px-4 h-auto mt-10 mb-10 lg:grid-cols-4 lg:grid-rows-1 lg:px-10  lg:min-w-max'>

      <div className='flex flex-col lg:justify-center mt-2 lg:mt-0 text-center lg:w-[200px]'>
          <div className='flex flex-col px-7 items-center lg:flex lg:flex-col lg:justify-center'>
            <img src={logo} alt={`carey logo`} className='w-24' />
            <div className='flex flex-row justify-center items center'>
              <Link to={'/home'}>
                <i className="fa-brands fa-facebook-f m-2"></i>
              </Link>
              <Link to={'/home'}>
                <i className="fa-brands fa-instagram m-2"></i>
              </Link>
              <Link to={'/home'}>
                <i className="fa-brands fa-twitter m-2"></i>
              </Link>
              <Link to={'/home'}>
                <i className="fa-brands fa-youtube m-2"></i>
              </Link>
            </div>
          </div>
        </div>
        
        <div className='flex flex-col align-center text-center lg:text-start lg:w-[200px] mb-5'>
          <h1 className='text-xl font-medium'>Support</h1>
          <Link to={'/home'} className='text-slate-600 font-normal'>Contact Us</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>FAQ</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Purchases</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Locate A Dealer</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Product Registration</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Spare Parts</Link>
        </div>

        <div className='flex flex-col align-center text-center lg:text-start lg:w-[200px]'>
          <h1 className='text-xl font-medium'>Resources</h1>
          <Link to={'/home'} className='text-slate-600 font-normal'>Delivery Company</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Current Location</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Faculty & Staff</Link>
          <Link to={'/home'} className='text-slate-600 font-normal'>Visitors</Link>
        </div>

        <div className='flex flex-col align-center text-center w-[200px] justify-self-center lg:w-[200px]'>
          <h1 className='text-xl font-medium'>Download our Apps</h1>
          <div className='px-7'>
            <img src={app} alt={`appstore logo`} className='mt-3' />
            <hr />
            <img src={play} alt={`playstore logo`} className='mt-5' />
          </div>
        </div>



      </div>
    </>
  )
}
