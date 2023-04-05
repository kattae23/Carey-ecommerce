import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ecommerceApi } from "../../api";
import { useState } from "react";
import { Spinner } from "./Spinner";


const validationSchema = yup.object({
    // name: yup.string().required('The Name is required'),
    // lastName: yup.string().required('The Lastname is required'),
    email: yup.string().required('The email is required').email('The email is not a valid format'),
    // description: yup.string().required('The description is required')
})

export const Contact = () => {

    const { register, formState: { errors }, watch, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const [message, setMessage] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const onContact = async (contactForm) => {
        setIsLoading(true)
        const { data } = await ecommerceApi.post('/contact', contactForm)
        if (!data.error) {
            setMessage(data)
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className='flex flex-col lg:mx-32 lg:flex-row mt-32 mb-32'>
                <div className='flex flex-col mb-24 text-center px-16 lg:mb-0 lg:justify-center lg:w-2/4 lg:text-left'>
                    <h1 className='font-bold text-4xl mb-12'>Contact us</h1>
                    <p className='text-slate-600'>need to get in touch with us? Either fill out the form with your inquiry or find the department email you'd like to contact below.</p>
                </div>
                <div className='flex flex-col px-11 items-center lg:w-2/4'>
                    <div className='lg:max-w-sm items-center flex flex-col'>
                        <form onSubmit={handleSubmit(onContact)} className='lg:max-w-sm items-center flex flex-col'>
                            <div className='flex flex-row'>
                                <input type="text" name="firstName" {...register('firstName')} className='w-2/4 grayInput mt-7 mr-3 py-3 rounded px-3 hover:outline-none' placeholder='First Name' />
                                <input type="text" name="lastName" {...register('lastName')} className='w-2/4 grayInput mt-7 py-3 rounded px-3 hover:outline-none' placeholder='Last Name' />
                            </div>
                            <div className="flex flex-row w-full">
                                <p className="text-left text-red-700 pt-2">{errors.firstName?.message}</p>
                                <p className=" text-red-700 pt-2 text-right ml-10">{errors.lastName?.message}</p>
                            </div>
                            <input type="email" name="email" {...register('email')} className='block w-full grayInput mt-7 py-3 rounded px-3 hover:outline-none' placeholder='Email' />
                            <div className="flex flex-row w-full">
                                <p className="text-left ml-3 text-red-700">{errors.email?.message}</p>
                            </div>
                            <textarea type="text" name="description" {...register('description')} className='block w-full grayInput mt-3 h-24 py-2 rounded px-3 hover:outline-none resize-none' placeholder='How we can help you?' />
                            <div className="flex flex-row w-full">
                                <p className="text-left ml-3 text-red-700 mt-3">{errors.description?.message}</p>
                            </div>
                            <button className='py-2 px-4 mt-5 text-white buttonColor rounded-lg'>
                                {
                                    isLoading ? <Spinner /> : "Submit"
                                }
                            </button>
                            {
                                message !== null ? <>
                                    <p className={`font-semibold text-gray-700 mt-5 py-2 px-7 rounded-sm w-full text-center text-white ${message !== null && message?.msg === 'email sent...' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {message?.msg}
                                    </p>
                                </> : null
                            }
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
