import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const CheckoutList = (props) => {

  const { user } = useSelector(state => state.auth)


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

  const [onOpen, setOnOpen] = useState(false);

  const [onOpenCart, setOnOpenCart] = useState(false);

  const handleClickCart = ({ product }) => {
    setOnOpenCart(!onOpenCart)
  }

  const navigate = useNavigate()

  const handleClickNew = () => {
    navigate(`/order/${props.orderId}`, {
      replace: true
    })
  }





  return (
    <>
      {
        // props.cart.map(cart => (
        <tr>
          <td className=" border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center relative">
              {/* <div className="flex-shrink-0 w-10 h-10">
                <img className="w-full h-full rounded-full"
                  src=""
                  alt="" />
              </div> */}
              <div className="ml-3 cursor-pointer py-1 px-1 rounded-full" onClick={handleClickNew}>
                {
                  props.cart.map((cart, index) => (
                    <div key={index} className='flex flex-row w-auto h-auto py-1' >
                      <div className='relative' onClick={handleClickCart}>
                        <div className='flex flex-col'>
                          <h1 className='inline-block text-sm hover:font-semibold hover:text-gray-600' >Click for more..</h1>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {/* <p className="text-gray-900 whitespace-no-wrap">{(props.orderId).slice(19, 27)}</p> */}
            <p className="text-gray-900 whitespace-no-wrap">{(props.orderId)}</p>
          </td>
          <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
              $ {props.totalPrice}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(props.date).toLocaleDateString('es-mx')}
            </p>
          </td>
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              className={`relative inline-block px-3 py-1 font-semibold ${(props.shipped === true ? 'text-green-900 ' : 'text-red-900 ')} leading-tight`}>
              <span aria-hidden
                className={`absolute inset-0 ${(props.shipped === true ? 'bg-green-200 ' : 'bg-red-200')} opacity-50 rounded-full`}></span>
              <div className="relative">
                <span className="">{(props.shipped === true ? 'Shipped' : 'Not Shipped')}</span>
              </div>
            </span>
          </td>
        </tr>
        // ))
      }
    </>
  )
}
