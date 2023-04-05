import React from 'react'
import { VITE_API_URL } from '../../api/ecommerceApi'
import Swal from 'sweetalert2';


export const ProductProfile = ({ name, img, price, user, _id, getProductWithImages }) => {


    const { startDeleteProduct } = useProductStore();

    const PRODUCT_IMAGE = `${VITE_API_URL}/uploads/products/${_id}?${new Date().getTime()}`

    const onDeleteProduct = ({ id }) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                startDeleteProduct({ id })
                getProductWithImages()
            }
        })
    }
    
    return (
        <>
            <div className="rounded-xl border-2 border-gray-300 principal w-60 m-5">
                <div className='flex justify-center items-center w-[236px] h-[208px]'>
                    <img src={PRODUCT_IMAGE} alt="" className='w-52' />
                </div>
                <div className="py-4 px-5 relative">
                    <span className='text-gray-600 font-light line-through'>$78</span>
                    <div className="off-div">
                        <p className='py-1 text-gray-600'>{name}</p>
                    </div>
                    <div className="star text-yellow-400">
                        <i className="fa-solid fa-star mr-1"></i>
                        <i className="fa-solid fa-star mr-1"></i>
                        <i className="fa-solid fa-star mr-1"></i>
                        <i className="fa-solid fa-star mr-1"></i>
                        <i className="fa-solid fa-star mr-1"></i>
                    </div>
                    <h4 className='text-green-500 font-bold'>Free shipping</h4>
                    <h5 className='font-bold'>$<span className="h55 font-bold">{price}</span> <span className="off font-medium ml-2 text-green-600 text-sm line-through">30% OFF</span>
                    </h5>
                    <div className="absolute right-4 top-20">
                        <button onClick={() => { onDeleteProduct({ id: _id }) }} >
                            <i className="fa-solid fa-trash border hover:cursor-pointer rounded-full p-[13px] bg-[#e8f6ea] text-[#ff3333] text-[1rem] hover:bg-[#b3dbba]"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
