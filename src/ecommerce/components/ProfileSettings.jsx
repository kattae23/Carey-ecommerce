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
import { Spinner } from './Spinner';


const validationSchema = yup.object({
  firstName: yup.string().required('The fisrt name is required').min(3).max(13),
  email: yup.string().required('The email is required').email('The email is not a valid format'),
  lastName: yup.string().required('The last name is required').min(3).max(13),
})

export const ProfileSettings = () => {

  const { startUpdateUser, startUpdateUserImg } = useAuthStore();
  const { user } = useSelector(state => state.auth)

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    setValue
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema)
  });

  const [message, setMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ firstName, id, lastName, email }) => {
    setIsLoading(true)
    const data = await startUpdateUser({ firstName, id: user.uid, email, lastName })
    if (!data.error) {
      setMessage({ msg: "Success" })
    }
    setIsLoading(false)
  };

  let inputRef

  // file preview

  const imageMimeType = /image\/(png|jpg|jpeg|webp)/i;

  const [file, setFile] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }


  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
      }
      fileReader.readAsDataURL(file);
      const uploadFile = async () => {
        const res = await startUpdateUserImg({ file, id: user.uid })
      }
      uploadFile()
    }
    setValue('firstName', user.firstName)
    setValue('lastName', user.lastName)
    setValue('email', user.email)
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }


  }, [file]);


  return (
    <div className='w-full'>
      <div className='w-full text-center'>
        <h1 className='text-[26px] mb-5'>Profile Settings</h1>
      </div>
      <div className='w-full h-full border-2 rounded-3xl'>
        <div className='w-full h-auto border-2 rounded-3xl'>
          <div className='flex mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] flex-center items-center justify-center'>
            <h1 className='font-normal'>Authentication options</h1>
          </div>
          <div className='flex flex-col mb-3 pt-[20px] pb-[20px] p-[25px] text-[20px] px-16'>
            <div className=''>
              <div>
                <div>
                  <div className='w-full items-center justify-center relative flex flex-col'>
                    <div className={`w-52 h-52 overflow-hidden rounded-full flex justify-center items-center mb-10`}>
                      <input
                        type="file"
                        name="file"
                        hidden={true}
                        ref={refParam => inputRef = refParam}
                        id="image"
                        onChange={changeHandler}
                      />
                      <button
                        type='button'
                        onClick={() => inputRef.click()}
                        id={'button'}
                        className="w-full"
                      >
                        <img src={user.urlImgThumb} className='w-full ' />
                      </button>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit2(onSubmit)}>
                  <h1 className='mb-2'>
                    {/* First Name: {user.firstName} */}
                  </h1>
                  <h1 className='mb-3'></h1>
                  <div className='flex flex-col'>
                    <div className='flex flex-col'>
                      <p className='text-gray-500 text-base mb-5'>Change your first name.</p>
                      <TextField id="outlined-basic" variant="outlined" name="firstName" {...register2('firstName')} />
                      <div className="flex flex-row">
                        <p className="text-left text-red-700 mb-4 text-sm">{errors2?.firstName?.message}</p>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-gray-500 text-base mb-5'>Change your Last Name.</p>
                      <TextField id="outlined-basic" variant="outlined" name="lastName" {...register2('lastName')} />
                      <div className="flex flex-row">
                        <p className="text-left text-red-700 mb-4 text-sm">{errors2?.lastName?.message}</p>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-gray-500 text-base mb-5'>Change your Email.</p>
                      <TextField id="outlined-basic" variant="outlined" name="email" {...register2('email')} />
                      <div className="flex flex-row">
                        <p className="text-left text-red-700 mb-4 text-sm">{errors2?.email?.message}</p>
                      </div>
                    </div>
                    <Button sx={{ width: '100%' }} variant="contained" type='submit' onClick={handleSubmit2(onSubmit)}>
                      {
                        isLoading ? <Spinner /> : "Change"
                      }
                    </Button>
                    {
                      message !== null ? <>
                        <p className={`font-semibold text-gray-700 mt-5 py-2 px-7 rounded-sm w-full text-center text-white ${message !== null && message?.msg === 'email sent...' ? 'bg-red-600' : 'bg-green-500'}`}>
                          {message?.msg}
                        </p>
                      </> : null
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
