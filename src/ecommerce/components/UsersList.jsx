import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { ecommerceApi } from '../../api'
import { onUpdateUser } from '../../store/ecommerce/usersSlice'

export const UsersList = ({ backgroundImg, firstName, lastName, role, status, img, urlImgThumb, google, uid }) => {
    
    const dispatch = useDispatch();

    const onBlockUser = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: 'Active',
            cancelButtonText: "Inactive",
            cancelButtonColor: "red"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Active!',
                    'The user was unblocked.',
                    'success'
                )
                const block = async () => {
                    const { data } = await ecommerceApi.put(`/users/${uid}`, { status: true });
                    dispatch(onUpdateUser({
                        ...data
                    }));
                }
                block()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Inactive!',
                    'The user was blocked.',
                    'success'
                )
                const unBlock = async () => {
                    const { data } = await ecommerceApi.delete(`/users/${uid}`, { status: false });
                    dispatch(onUpdateUser({
                        ...data
                    }));
                }
                unBlock()
            }

        })
    }

    return (
        <>
            <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full"
                                src={urlImgThumb}
                                alt="" />
                        </div>
                        {/* <div className="ml-3 cursor-pointer py-1 px-1 rounded-full" onClick={handleClickNew}> */}
                        <div className="ml-3 cursor-pointer py-1 px-1 rounded-full">
                            <p className="text-gray-900 whitespace-no-wrap">
                                {firstName} {lastName}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{(google) ? 'Google' : 'No'}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {(role === 'ADMIN_ROLE') ? 'ADMIN' : 'USER'}
                    </p>
                </td>
                <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        <span className='text-green-600 font-semibold text-base'></span>
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                        className={`relative inline-block px-3 py-1 font-semibold ${(status === true ? 'text-green-900 ' : 'text-red-900 ')} leading-tight`}>
                        <span aria-hidden
                            className={`absolute inset-0 ${(status === true ? 'bg-green-200 ' : 'bg-red-200')} opacity-50 rounded-full`}></span>
                        <div className="relative">
                            <button onClick={() => { onBlockUser() }} >
                                <span className="">{(status === true ? 'Active' : 'Inactive')}</span>
                            </button>
                        </div>
                    </span>
                </td>
            </tr>
        </>
    )
}
