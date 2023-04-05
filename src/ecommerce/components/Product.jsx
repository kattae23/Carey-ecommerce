import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeartFilled from '../../ui/components/icons/HeartFilled';
import { Navbar } from '../../ui/components/Navbar'




export const Product = ({ available, _id, urlImgThumb, name, price, user }) => {

    const [onBuy, setOnBuy] = useState(0);

    const onBuyProduct = () => {
        setOnBuy(onBuy + 1);
    }

    <Navbar onBuy={onBuy} />

    return (
        <>
            {
                (available === true)
                && (
                    <Link to={`/product/${_id}`}>
                        <div className="cursor-pointer w-auto h-[200px] md:h-[300px] border-gray-300 principal relative justify-between rounded-lg" key={_id}>
                            <button className='absolute right-0 top-4 text-red-500 z-10'>
                                <HeartFilled />
                            </button>
                            <div className='flex flex-col h-full justify-start '>
                                <div className='rounded-lg overflow-hidden h-[240px] flex items-center justify-center bg-[#E2E2E2]'>
                                    <div className='flex justify-center overflow-hidden items-center w-auto bg-[#E2E2E2] h-full'>
                                        <img src={urlImgThumb} alt={`${name + ' image'}`} className='relative h-full max-w-none' />
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="off-div">
                                        <p className='py-1 text-gray-900'>{name}</p>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <h5 className='text-sm font-bold text-gray-500 mb-1'>{user.firstName} {user.lastName}</h5>
                                        <h5 className='text-[#343a40] font-normal text-sm'>{price}$</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
                || null
            }
        </>
    )
}
