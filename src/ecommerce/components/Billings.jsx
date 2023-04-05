import React, { useMemo, useState } from 'react'
import { useAuthStore } from '../../hooks';

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material'
import countryList from 'react-select-country-list'
import Select from 'react-select';
import { useEffect } from 'react';

const validationSchema = yup.object({
  address: yup.string().required('The address is required'),
  city: yup.string().required('The city is required'),
  // country: yup.string().required('The country is required'),
  state: yup.string().required('The state is required'),
  zipcode: yup.string().required('The zipcode is required'),
})


export const Billings = () => {
  const [country, setCountry] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = country => {
    setCountry(country)
  }

  const { register, formState: { errors }, watch, handleSubmit, setValue } = useForm({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    setValue('address', user.address)
    setValue('country', user.country)
    setValue('state', user.state)
    setValue('city', user.city)
    setValue('zipcode', user.zipcode)
    setValue('phone', user.phone)
  }, []);

  const { startUpdateUser, user } = useAuthStore();

  const onSubmit2 = ({ city, address, state, zipcode, phone }) => {
    startUpdateUser({ id: user.uid, city: city, address: address, state: state, country: country.value, zipcode: zipcode, phone: phone })
  }

  return (
    <>
      <div className='w-full'>
        <div className='w-full text-center'>
          <h1 className='text-[26px] mb-5'>Billing Settings</h1>
        </div>
        <div className='w-full h-full border-2 rounded-3xl'>
          <div className='w-full h-auto border-2 rounded-3xl'>
            <div className='flex mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] flex-center items-center justify-center'>
              <h1 className='font-normal'>Payment options</h1>
            </div>
            <div className='flex flex-col mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] px-16'>
              <div className=''>
                <div>
                  <h1 className='mb-2'>
                    Addres Information
                  </h1>
                  <div className='flex items-center'>
                    <div className='flex flex-col'>
                      <h1 className='text-xs md:text-sm mb-6 mt-3'>You need to set your addres information to buy a product</h1>
                      <div className="text-sm w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-3 items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">City</span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{user.city ? user.city : 'Fill the city information'}</span>
                          </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">Country</span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{user.country ? user.country : 'Fill the country information'}</span>
                          </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">State</span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{user.state ? user.state : 'Fill the state information'}</span>
                          </div>
                        </div>
                        <div className="w-full flex items-center mb-3">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">Billing Address</span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{user.address ? user.address : 'Fill the address information'}</span>
                          </div>
                        </div>
                        <div className="w-full flex items-center mb-3">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">Zip / Postal Code</span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{user.zipcode ? user.zipcode : 'Fill the Postal Code information'}</span>
                          </div>
                        </div>
                        <div className="w-full flex items-center">
                          <div className="w-32">
                            <span className="text-gray-600 font-semibold">Phone Number</span>
                          </div>
                          <div className="flex-grow pl-3">
                            <span>{user.phone ? user.phone : 'Fill the Phone Number'}</span>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit2)}>
                        <div className="w-full mt-10">
                          <TextField multiline rows={2.5} sx={{ width: '100%' }} label="Address" name='address'
                            {...register('address', { required: true })} />
                        </div>
                        <div className="w-full flex flex-col mb-5 mt-3">
                          <div className='mr-3 mb-5 w-full'>
                            <TextField sx={{ width: '100%' }} label="City" name='city'
                              {...register('city', { required: true })} />
                          </div>
                          <div className='w-full relative flex flex-col'>
                            <Select
                              className="dropdown z-50"
                              value={country} // set selected values
                              options={options} // set list of the data
                              onChange={changeHandler} // assign onChange function
                            />
                          </div>
                        </div>
                        <div className='w-full mb-4'>
                          <TextField sx={{ width: '100%' }} label='State' name='state'
                            {...register('state', { required: true })} />
                        </div>
                        <div className='w-full mb-4 mt-1'>
                          <TextField sx={{ width: '100%' }} label='Zip Code / Postal Code' name='zipcode'
                            {...register('zipcode', { required: true })} />
                        </div>
                        <div className='w-full mb-4 mt-1'>
                          <TextField sx={{ width: '100%' }} label='Phone Number' name='phone'
                            {...register('phone', { required: true })} />
                        </div>
                        <div className='w-full flex justify-center'>
                          <Button sx={{ width: '100%' }} variant="contained" type='submit'>Submit</Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className='mb-2 mt-10'>
                    Paypal
                  </h1>
                  <div className='flex items-center'>
                    <div className='flex flex-col'>
                      <div className='filter grayscale'>
                        <h1 className='text-lg hidden'>You need to connect your paypal account</h1>
                        <h1 className='text-lg text-gray-700'>Soon</h1>
                        <Link className='text-gray-500 text-base mt-1 hover:text-gray-900'>www.paypal.com<img src="https://cdn-icons-png.flaticon.com/512/349/349247.png" className='w-20' alt="paypal logo for the payments" /></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
