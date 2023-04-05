
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCategoryStore, useProductStore } from '../../hooks'
import { Footer, Navbar } from '../../ui/components'
import { ProductByCategory } from '../components'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from 'swiper'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";


export const CollectionPage = () => {

  const { category } = useCategoryStore()

  const { products } = useProductStore();

  const [currentPage, setCurrentPage] = useState(0)


  useEffect(() => {
    startLoadingProducts({ limit: 0 })
    startLoadingCategory()
  }, []);

  const prevPage = () => {
    if (currentPage > 0)
      setCurrentPage(currentPage - 5);
  }

  const nextPage = () => {
    if (products.length > currentPage + 5)
      setCurrentPage(currentPage + 5);
  }

  const { startLoadingProducts, startSearchProduct } = useProductStore();
  const { startLoadingCategory } = useCategoryStore();

  const filteredCategory = () => {

    let thirdArray;

    return thirdArray = category.filter((elem) => {
      return products.some((ele) => {
        return ele.category._id === elem._id && ele.category._id === elem._id;
      });
    });
  }

  const onSearchya = () => {
    startSearchProduct({ search: '' })
  }

  return (
    <>
      <Navbar />
      {
        filteredCategory().map(cat => (
          <div key={cat._id} className='relative w-full flex flex-col'>
            <h1 className='mt-10 ml-20 font-medium text-gray-900 text-2xl'>{cat.name}</h1>
            <div className='py-2 px-5 relative w-full flex flex-row'>
              {/* 
                slidesPerView="auto"
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper" */}
              <Swiper
                freeMode={true}
                grabCursor={true}
                modules={[FreeMode]}
                className="mySwiper"
                breakpoints={{
                  // when window width is >= 640px
                  200: {
                    width: 300,
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={30}
              >
                {
                  products.map((product, index) => (
                    (cat._id === product.category._id)
                      ? (
                        <SwiperSlide className='swiper-slide-mobile gap-4' key={index}>
                          <ProductByCategory className='cursor-pointer'{...product} cat={cat._id} />
                        </SwiperSlide>
                      )
                      : null
                  ))
                }

              </Swiper>
            </div>
          </div>
        ))
      }
      <Footer />
    </>
  )
}
