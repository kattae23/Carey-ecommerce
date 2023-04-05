import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { VITE_API_URL } from '../../api/ecommerceApi'
import { useCategoryStore, useProductStore, useUiStore } from '../../hooks'

export const ProductList = (props) => {

    const { user, date, price, available, name, _id, startSavingProduct, category, urlImgThumb, description, startDeleteProduct, product } = props

    const onDeleteProduct = ({ id }) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'red',
            confirmButtonText: 'Inactive',
            cancelButtonText: "Active",
            cancelButtonColor: "green"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Inactive!',
                    'Your product has been inactived.',
                    'success'
                )
                startSavingProduct({ _id, available: false, name, category: category._id })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Active!',
                    'Your product has been Active.',
                    'success'
                )
                startSavingProduct({ _id, available: true, name, category: category._id })
            }

        })
    }



    const { openProductModal3 } = useUiStore();
    const { setActiveProduct } = useProductStore();

    const [disabled, setDisabled] = useState(false);

    const handleClickUpdate = () => {
        setActiveProduct({
            _id: _id,
            ...product,
        });
        openProductModal3()
    }

    const navigate = useNavigate()

    const handleClickNew = () => {
        navigate(`/product/${props._id}`, {
            replace: true
        })
    }



    return (
        <>
            <tr onClick={() => (disabled ? null : handleClickUpdate())} className='cursor-pointer'>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full"
                                src={props.urlImgThumb}
                                alt={`${name + " image"}`} />
                        </div>
                        <div className="ml-3 cursor-pointer py-1 px-1 rounded-full" onMouseEnter={() => setDisabled(true)} onMouseLeave={() => setDisabled(false)} onClick={() => { handleClickNew() }}>
                            <p className="text-gray-900 hover:font-semibold hover:text-gray-600 whitespace-no-wrap">
                                {name}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.firstName} {user.lastName}</p>
                </td>
                <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {new Date(date).toLocaleDateString('es-mx')}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {price} <span className='text-green-600 font-semibold text-base'>$</span>
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${(available === true ? 'text-green-900 ' : 'text-red-900 ')} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${(available === true ? 'bg-green-200 ' : 'bg-red-200')} opacity-50 rounded-full`}></span>
                        <div className="relative">
                            <button onMouseEnter={() => setDisabled(true)} onMouseLeave={() => setDisabled(false)} onClick={() => (disabled ? onDeleteProduct({ id: _id }) : null )}>
                                <span className="">{(available === true ? 'Active' : 'Inactive')}</span>
                            </button>
                        </div>
                    </span>
                </td>
            </tr>
        </>
    )
}
