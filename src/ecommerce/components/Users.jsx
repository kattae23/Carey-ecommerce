import React from 'react'
import HeartFilled from '../../ui/components/icons/HeartFilled';




export const Users = ({ firstName, lastName, email, role, urlImgThumb, status, uid, }) => {


    return (
        <>
            {
                (status === true)
                && (
                    <div className="cursor-pointer w-auto h-[200px] md:h-[300px] border-gray-300 principal relative justify-between" key={uid}>
                        <div className='flex flex-col h-full justify-start '>
                            <div className='overflow-hidden h-[240px] flex items-center justify-center bg-[#E2E2E2]'>
                                <div className='flex justify-center overflow-hidden items-center w-auto bg-[#E2E2E2] h-full'>
                                    <img src={urlImgThumb} alt="" className='relative h-full max-w-none' />
                                </div>
                            </div>
                            <div className="relative">
                                <div className="off-div">
                                    <p className='py-1 text-gray-900'>{name}</p>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <h5 className='text-sm font-bold text-gray-500 mb-1'>{firstName} {lastName}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                || <h1>epale no hay</h1>
            }
        </>
    )
}
