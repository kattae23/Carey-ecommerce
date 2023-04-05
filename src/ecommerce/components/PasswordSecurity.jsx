import React from 'react'
import { useAuthStore } from '../../hooks';

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export const PasswordSecurity = () => {


    const validationSchema = yup.object({
        password: yup.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must be match.')
    })


    const { startUpdateUser, errorMessage } = useAuthStore();
    const { status, user } = useSelector(state => state.auth)


    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit = ({ password }) => {
        startUpdateUser({ password, id: user.uid })
    }

    const [onSetWatchPassword, setOnSetWatchPassword] = useState(false);

    const onWatchPassword = (e) => {
        setOnSetWatchPassword(!onSetWatchPassword);
    }

    return (
        <>
            <div className='w-full'>
                <div className='w-full text-center'>
                    <h1 className='text-[26px] mb-5'>Password Settings</h1>
                </div>
                <div className='w-full h-full border-2 rounded-3xl'>
                    <div className='w-full h-auto border-2 rounded-3xl'>
                        <div className='flex mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] flex-center items-center justify-center'>
                            <h1 className='font-normal'>Authentication options</h1>
                        </div>
                        <div className='flex flex-col mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] px-16'>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className='w-full'>
                                    <div>
                                        <h1 className='mb-2'>
                                            Change Passsword
                                        </h1>
                                        <div className='flex items-center'>
                                            <div className='flex flex-col'>
                                                <p className='text-gray-500 text-sm'>Choose a strong, unique password that's at least 8 characters long.</p>
                                                <div className=' relative items-center mt-10'>
                                                    <TextField label={'Password'} type={
                                                        (onSetWatchPassword === false) ? 'password' : 'text'
                                                    } className="py-2 mt-2 px-4 outline-none text-base shadow-lg mb-5" name="password"  {...register('password')} />
                                                </div>
                                                <p className="text-left text-red-700 mb-4 mt-1 text-xs">{errors.password?.message}</p>
                                                <div className='flex flex-row relative items-center '>
                                                    <TextField label={'Confirm Password'} type={
                                                        (onSetWatchPassword === false) ? 'password' : 'text'
                                                    } className="py-2 mt-2 px-4 outline-none text-base shadow-lg mb-5" name="password"  {...register('confirmPassword')} />
                                                </div>
                                                <p className="text-left text-red-700 mb-10 text-xs">{errors.confirmPassword?.message && 'Password must be match'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full justify-center flex'>
                                    <Button sx={{ width: '100%' }} variant="contained" type='submit' className='py-2 px-4 rounded-md text-white hover:bg-[#64c083] bg-[#2f9445] text-sm' onClick={handleSubmit(onSubmit)}>Change</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
