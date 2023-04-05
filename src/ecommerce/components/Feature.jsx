import React from 'react'
import fastDelivery from './img/features/fast-delivery.png'
import aLotOfProducts from './img/features/a-lot-of-products.png'
import fastTransaction from './img/features/fast-transaction.png'
import getDelivery from './img/features/get-delivery.png'
import offers from './img/features/offers.png'
import spaceOffer from './img/features/space-special-offer.png'

const feature = [
    {
        title: 'Fast Transaction',
        src: fastDelivery
    },
    {
        title: 'Good Reviews',
        src: getDelivery
    },
    {
        title: 'Space Offers',
        src: spaceOffer
    },
    {
        title: 'Promotions',
        src: offers
    },
    {
        title: 'Plenty of Choices',
        src: aLotOfProducts
    },
    {
        title: 'Fast Delivery',
        src: fastTransaction
    },
]

export const Feature = () => {



    return (
        <>
            <div className='relative flex flex-col md:flex-row flex-wrap items-center justify-between md:py-[40px] px-[40px] md:px-[50px] md:justify-center'>
                {
                    feature.map(fea => (
                        <div key={fea.title} className='w-[180px] h-[237px] py-6 px-4 m-4 border shadow-lg text-center items-center flex relative flex-col justify-between '>
                            <div className='w-40 relative'>
                                <img src={fea.src} alt={`${fea.title}`} className='w-40'/>
                            </div>
                            <h6 className='bottom-3 left-11 pt-[9px] pb-[6px] w-10/12 px-2 text-[12px] bg-[#DF5858] rounded-md inline text-white'>{fea.title}</h6>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
