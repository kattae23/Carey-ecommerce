import React from 'react'
import { useState } from 'react';
import { useProductStore } from '../../hooks';
import { Product } from './Product'

export const Products = () => {


    const { activeProduct, startSavingProduct, products, startLoadingProducts, startNextPage } = useProductStore();

    const [currentPage, setCurrentPage] = useState(0)

    const filteredProducts = () => {
        return products.slice(currentPage, currentPage + 8);
    }

    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 5);
    }

    const nextPage = () => {
        if (products.length > currentPage + 5)
            setCurrentPage(currentPage + 5);
    }

    return (
        <>
            <div className='flex flex-col relative items-center justify-between pt-[40px] px-[40px] md:px-[50px] md:mt-20 md:mb-11'>
                <div className='text-center mb-11'>
                    <h1 className='text-5xl font-semibold'>Featured Products</h1>
                    <p className='mt-10 text-base text-[#465b52]'>Summer Collection New Modern Design</p>
                </div>

                <div className="pro-container scroll-content fadeTop grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        filteredProducts().map((product, index) => (
                            <Product className='cursor-pointer' key={index} {...product} />

                        ))
                    }
                </div>
                <div>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            {/* Showing 1 to {filteredProducts().length} of {products.length} Entries */}
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                onClick={prevPage}
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            &nbsp; &nbsp;
                            <button
                                onClick={nextPage}
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
