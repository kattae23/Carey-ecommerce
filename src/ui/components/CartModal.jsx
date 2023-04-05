import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { onDeleteCart, onSetActiveCart, onTotalPriceRemove, removeFromCart } from '../../store/ecommerce/ecommerceSlice'
import { TrashIcon } from './icons'

export const CartModal = ({ onOpenCart }) => {


    const { cart, totalPrice, totalAmount } = useSelector(state => state.ecommerce)

    const { user } = useSelector(state => state.auth)


    const productsFiltered = () => {

        return cart.map(cart => cart)
    }

    const dispatch = useDispatch();


    const [select, setSelect] = useState(false);

    const onSelect = () => {
        setSelect(!select)
    }

    const [buySmthg, setBuySmthg] = useState(false);

    const onBuySmthg = () => {
        setBuySmthg(true)
    }


    return (
        <div className={`absolute right-2 ${(onOpenCart === true) && 'top-24' || '-top-[1000px]'} bg-white w-96 h-auto overflow-y-auto overflow-x-hidden no-scrollbar transition-all duration-500 -z-50 flex flex-col justify-start text-start`}>
            <div className='flex items-center justify-center flex-col w-full h-16 bg-[#EBECED]'>
                <div className={`flex flex-row`}>
                    <h1 className='text-lg font-bold mr-3'>My Cart</h1> <h1 className='text-lg'>{`(Quantity ${cart.length})`}</h1>
                </div>
            </div>
            <div className='overflow-y-scroll h-80'>
                {
                    productsFiltered().map((product, index) => (
                        <div className={`px-[1rem]  ${(select === true) ? 'bg-slate-400' : 'bg-none'}`} key={index}>
                            <NavLink className={`flex flex-row items-center justify-start py-[1rem] font-normal text-black w-full relative border-b border-dashed`}>
                                <div className='flex flex-row' onClick={() => onSelect({ product })}>
                                    <div className={`flex flex-row`}>
                                        <div className='w-32 h-32 overflow-hidden'>
                                            <img src={product.urlImgThumb} alt={`${product.name + " image on the cart"}`} />
                                        </div>
                                        <div className='py-2 ml-3'>
                                            <div className=''>
                                                <h1>{product.name}</h1>
                                                {/* <h1>{(product.description)}</h1> */}
                                                <h1>Color: {product.color.value}</h1>
                                                <h1>Size: {product.size.value}</h1>
                                                <h1>Amount: {product.amount}</h1>
                                                <p className='text-sm text-[#7d7d7d]'>{product.price} $</p>
                                            </div>
                                            <div>
                                                <button onClick={() => dispatch(removeFromCart(product))} className={` ${(select === true) ? 'flex' : 'hidden'} transition-all duration-150 absolute right-0 hover:bg-black hover:text-white bottom-2 border p-2 border-gray-900`}>
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
            <div className='flex- flex-row justify-between bg-[#EBECED] py-[1.5rem] px-[1rem]'>
                <div className='flex flex-row justify-between'>
                    <div className='h-auto w-auto flex flex-col'>
                        <h1>Subtotal</h1>
                        <h1 className='font-bold'>Total:</h1>
                    </div>
                    <div className='h-auto w-auto flex flex-col'>
                        <h1>{totalPrice} $</h1>
                        <h1 className='font-bold'>{totalPrice} $</h1>
                    </div>
                </div>
            </div>
            <div className='flex- flex-row justify-between py-[1.5rem] px-[1rem]'>
                <div className='w-full justify-center text-center pt-2 pb-2 text-gray-800'>
                    {
                        (buySmthg === true && totalAmount === 0) ? <p className=''>You need to add some <Link className='underline font-semibold' to={'/search'}>Item</Link> to the cart </p> : null
                            ||
                            (!user.address && !user.city) ? <p className=''>You need to fill your address information in the <Link className='underline font-semibold' to={'/settings/billings'}>Billing</Link> configuration</p> : null
                    }
                </div>
                <div className='flex flex-row justify-center'>
                    <div className='h-auto w-auto flex flex-col mr-6'>
                        <Link to={'/settings/cart'} className='py-3 px-5 border transition-all duration-200 border-black hover:bg-black hover:text-white font-semibold uppercase'>
                            Watch cart
                        </Link>
                    </div>
                    <div className='h-auto w-auto flex flex-col font-semibold'>
                        {
                            (totalAmount !== 0 && user.city && user.address && user.state && user.country && user.zipcode && user.phone) ? (
                                <Link to={'/checkout'} className={`py-3 px-5 bg-black  text-white uppercase`}>
                                    Start to buy
                                </Link>
                            )
                                :
                                (
                                    <button onClick={onBuySmthg} className={`py-3 px-5 bg-black  text-white uppercase`}>
                                        Start to buy
                                    </button>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
