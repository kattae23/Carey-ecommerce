import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { VITE_API_URL } from '../../api/ecommerceApi'
import logo from '../../ecommerce/components/img/logo.png'
import { useAuthStore } from '../../hooks'
import { CartModal } from './CartModal'
import Heart from './icons/Heart'
import Shop from './icons/Shop'
import { ProfileDiv } from './ProfileDiv'


export const colorMain = '#8330C2'




export const Navbar = ({ children }) => {

    const [open, setOpen] = useState(false);


    const { status, user, errorMessage } = useSelector(state => state.auth)
    const { products } = useSelector(state => state.products)

    const { startLogout } = useAuthStore();

    const [onOpenMenu, setOnOpenMenu] = useState(false);

    const openMenu = (e) => {
        setOnOpenMenu(!onOpenMenu);
    }

    const [onOpenCart, setOnOpenCart] = useState(false);

    const openCart = (e) => {
        setOnOpenCart(!onOpenCart);
    }

    const { cart } = useSelector(state => state.ecommerce)


    return (
        <>
            <div className='flex w-full box-border h-24 font-light bg-slate-50 fixed shadow-md top-0 left-0 z-50'>
                <div className='px-8 flex w-full h-full flex-row items-center lg:justify-between relative'>
                    <div className={`bg-slate-50 absolute flex top-24 left-0 w-full h-auto flex-col items-center lg:flex lg:flex-row lg:relative lg:top-0 lg:w-auto lg:bg-none transition-all duration-500 -z-30 lg:-z-0 ${open ? 'top-20' : 'top-[-490px]'}`}>
                        <NavLink to='/home' className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto'>
                            Home
                        </NavLink>
                        <NavLink to='/search' className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto'>
                            Search
                        </NavLink>

                        <NavLink to='/collection' className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto'>
                            Collection
                        </NavLink>
                        <NavLink to='/contact' className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto'>
                            Contact
                        </NavLink>
                        {
                            (status === 'authenticated')
                            && (
                                <>
                                    <NavLink to='/profile' className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto'>
                                        Profile
                                    </NavLink>
                                    <NavLink to='/settings' className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto lg:hidden'>
                                        Settings
                                    </NavLink>
                                    <button className='my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto mb-5 lg:hidden' onClick={startLogout}>
                                        Logout
                                    </button>
                                </>
                            )
                            || (
                                <>
                                    <NavLink to='/auth/login' className={'my-1 w-4/5 text-center hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200 lg:my-0 lg:w-auto lg:hidden'}>
                                        Login
                                    </NavLink>
                                    <NavLink to='/auth/register' className={'-z-30 my-1 w-4/5 text-center border-0 rounded-full px-5 py-3 text-white font-normal colorMain lg:hidden mb-5'}>
                                        REGISTER
                                    </NavLink>
                                </>
                            )
                        }
                    </div>
                    <div className='flex w-full h-full items-center min-w-fit ml-4 lg:ml-0 lg:justify-center'>
                        <NavLink to={'/home'}>
                            <img src={logo} alt={`carey logo`} className='w-28 h-14' />
                        </NavLink>
                    </div>
                    <div className='w-full justify-end space-x-1 hidden lg:flex items-center transition-all duration-75 h-24 z-50'>
                        {
                            (status === 'authenticated')
                            && (
                                <>
                                    <button className='w-auto relative' onClick={openCart}>
                                        <Shop /> <span className='text-green-500 font-medium absolute right-2 -top-3'>{(cart.length !== 0) ? `${cart.length}` : null}</span>
                                    </button>
                                    <CartModal onOpenCart={onOpenCart} />
                                    <button onClick={openMenu} type='button' className='flex flex-row items-center z-50  w-auto justify-center'>
                                        <div className={`w-10 h-10 overflow-hidden rounded-full flex justify-center items-center mr-2`}>
                                            <img src={user.urlImgThumb} key={user.urlImgThumb} className='w-full rounded-full' />
                                        </div>
                                    </button>
                                    <ProfileDiv onOpenMenu={onOpenMenu} startLogout={startLogout} {...user} />
                                </>
                            )
                            || (
                                <>
                                    <Link to={`${(status === 'authenticated') ? '/settings/cart' : '/auth/login'} `} className='flex items-center justify-center relative'>
                                        <Shop /><span className='text-green-500 font-medium absolute right-3 -top-2'>{(cart.length !== 0) ? `${cart.length}` : null}</span>
                                    </Link>
                                    <NavLink to='/auth/login' className={'hover:border rounded-full px-5 py-2 border-purple-700 hoverColor duration-200'}>
                                        Login
                                    </NavLink>
                                    <NavLink to='/auth/register' className={'border-0 rounded-full px-5 py-3 border-purple-700 text-white font-normal colorMain'}>
                                        REGISTER
                                    </NavLink>
                                </>
                            )
                        }
                    </div>
                    <div className='absolute right-0 mr-14 w-auto cursor-pointer hover:text-gray-600 lg:hidden flex'>
                        <Link to={`${(status === 'authenticated') ? '/settings/cart' : '/auth/login'} `} className='flex items-center justify-center relative'>
                            <Shop /><span className='text-green-500 font-medium absolute right-3 -top-2'>{(cart.length !== 0) ? `${cart.length}` : null}</span>
                        </Link>
                    </div>
                    <div className='absolute right-0 mr-7  w-auto cursor-pointer hover:text-gray-600 lg:hidden flex'>
                        <div onClick={() => setOpen(!open)} className=''>
                            <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}  text-4xl`}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-24'>
            </div>
            {children}
        </>
    )
}
