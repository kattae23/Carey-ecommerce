import React from 'react'
import Swal from 'sweetalert2'
import { useCategoryStore } from '../../hooks'

export const CategoryList = ({ name, user, enabled, _id }) => {

    const { startSavingCategory} = useCategoryStore();

    const onDeleteCategory = ({ id }) => {
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
                startSavingCategory({ _id:_id, enabled: false, name: name })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Active!',
                    'Your product has been Active.',
                    'success'
                )
                startSavingCategory({ _id:_id, enabled: true, name: name })
            }

        })
    }

    return (
        <>
            <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        {/* <div className="ml-3 cursor-pointer py-1 px-1 rounded-full" onClick={handleClickNew}> */}
                        <div className="-ml-1 cursor-pointer py-1 px-1 rounded-full">
                            <p className="text-gray-900 whitespace-no-wrap">
                                {name}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap"></p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">

                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        <span className='text-green-600 font-semibold text-base'></span>
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${(enabled === true ? 'text-green-900 ' : 'text-red-900 ')} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${(enabled === true ? 'bg-green-200 ' : 'bg-red-200')} opacity-50 rounded-full`}></span>
                        <div className="relative">
                            <button onClick={() => { onDeleteCategory({ id: _id }) }} >
                                <span className="">{(enabled === true ? 'Active' : 'Inactive')}</span>
                            </button>
                        </div>
                    </span>
                </td>
            </tr>
        </>
    )
}
