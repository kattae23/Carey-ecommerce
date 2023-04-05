
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAuthStore, useProductStore } from '../../hooks'
import { usersSlice } from '../../store/ecommerce/usersSlice'
import { Footer, Navbar } from '../../ui/components'
import { Product, Users } from '../components'

export const SearchPage = () => {

  const { startSearchProduct, products } = useProductStore();
  const { users } = useSelector(state => state.users)

  const [search, setSearch] = useState('');

  const onChangeSearch = ({ target }) => {
    setSearch(target.value)
  }

  const onSearchSubmit = (e) => {
    e.preventDefault()
    startSearchProduct({ search: search.trim() })
  }

  useEffect(() => {
    startSearchProduct({ search: search.trim() })
  }, []);

  const filteredProducts = () => {
    if (search === '') {
      return products.slice(0);
    }
    return products
  }

  const filteredUsers = () => {
    if (search === '') {
      return users.slice(0)
    }
    return users
  }



  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center my-10'>
        <div className='h-20 w-full justify-center px-6 py-5 flex flex-col'>
          <h1 className='mb-4 font-medium text-2xl ml-3'>Search </h1>
          <div className='w-full flex'>
            <form onSubmit={onSearchSubmit} className='w-full'>
              <input type="text" className='outline-none border border-gray-400 rounded-xl w-full py-2 px-3' placeholder='Search a product or user' onChange={onChangeSearch} value={search} />
            </form>
          </div>
        </div>
      </div>
      <div className='flex flex-col relative items-center justify-between pt-[0px] px-[40px] md:px-[50px] md:mt-20 md:mb-11'>
        <h1 className='text-gray-500 text-xl mb-5'>Products</h1>
        <div className="pro-container scroll-content fadeTop grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {
            (filteredProducts().length !== 0)
              ?
              (
                filteredProducts().map((product, index) => (
                  <Product className='cursor-pointer' key={index} {...product} />
                ))
              )
              :
              (
                <h1 className='text-sm text-gray-500 font-light'>Don't have any products</h1>
              )
          }
        </div>
      </div>
      <div className='flex flex-col relative items-center justify-between pt-[40px] px-[40px] md:px-[50px] md:mt-20 md:mb-11'>
        <h1 className='text-gray-500 text-xl mb-5'>Users</h1>
        <div className="pro-container scroll-content fadeTop grid grid-cols-2 md:grid-cols-3 gap-4">
          {
            (filteredUsers().length !== 0)
              ?
              (
                filteredUsers().map((product, index) => (
                  <Users className='cursor-pointer' key={index} {...product} />
                ))
              )
              :
              (
                <h1 className='text-sm text-gray-500 font-light'>Dont exist a user with that name or id</h1>
              )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
