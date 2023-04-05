import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useSaleStore } from '../../hooks'
import { Footer, Navbar } from '../../ui/components'
import { getOrderById } from './hooks/getOrderById'

export const SalesPage = () => {

    const { id } = useParams()

    const { startUpdateSaleFormUser } = useSaleStore();


    const [order, setOrder] = useState([]);
    
    const {status} = useSelector(state => state.auth)

    const checkout = getOrderById(id)

    useEffect(() => {
        if (checkout.length > 0) {
            setOrder(checkout)
        }
    }, [checkout]);

    const onShipProduct = ({ orderId }) => {
        const id = order[0]._id
        Swal.fire({
            title: 'Do you want to mark the product as shipped?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: 'Shipped',
            cancelButtonText: "Not Shipped",
            cancelButtonColor: "red"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Shipped!',
                    'Your product has been mark as shipped.',
                    'success'
                )
                startUpdateSaleFormUser({ id: id, shipped: true, orderId: orderId })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Not Shipped!',
                    'Your product has been mark as not shipped.',
                    'success'
                )
                startUpdateSaleFormUser({ id: id, shipped: false, orderId })
            }

        })
    }

    if (order.length > 0 && status === 'authenticated') {
        return (
            <>
                <Navbar />
                {
                    order.map((or, index) => (
                        <div key={index} className="flex justify-center items-center h-screen bg-gray-200 text-gray-900 rounded-2xl">
                            <div className="rounded-md relative w-auto shadow-2xl p-3 bg-white">
                                <div>
                                    <div className="text-center text-base font-semibold mb-3">Order</div>
                                    <div className="text-base pl-2">
                                        <div className="text-base mb-3">Customer: {or.user.firstName} {or.user.lastName}</div>
                                        <div className="text-base mb-3">TelePhone: {or.user.phone}</div>
                                        <div className="text-base mb-3">Order ID: {or.orderId}</div>
                                        <div className="text-base mb-5">Address: {or.address.line1}</div>
                                    </div>
                                    <div className="border-t-2 border-b-2 border-l-0 border-r-0 border-gray-900 my-3">
                                        <div className="flex text-sm pt-1 px-1 mb-1">
                                            <span className="w-2/6">Name</span>
                                            <span className="w-2/6 text-right">Price</span>
                                            <span className="w-2/6 text-right">Number</span>
                                        </div>
                                    </div>
                                    <div className="mt-1 my-2 py-2 px-1">
                                        {
                                            or.cart.map((cart, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="w-2/6 ">{cart.name}</span>
                                                    <span className="w-2/6 text-right">${cart.price}</span>
                                                    <span className="w-2/6 text-right">{cart.amount}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="text-right">
                                        <div>Time: {new Date(or.date).toLocaleDateString('es-mx')}</div>
                                        <div className="font-bold text-sm">Aggregate: ${or.totalPrice}</div>
                                    </div>
                                    <div className="font-bold text-sm">Shipped: {or.shipped ? 'Shipped' : 'Not Shipped'}</div>
                                    <div className="font-bold text-sm mt-5 justify-center flex">
                                        <Button sx={{ width: '40%' }} variant="contained" type='submit' onClick={() => onShipProduct({ orderId: or.orderId })}>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <div className="w-full h-[700px] flex justify-center relative flex-col bg-slate-100">
                    <div className="px-11 md:px-20 h-full flex justify-center flex-col relative">
                        <h1 className="lg:text-6xl text-4xl font-[800]">I have bad <br /> news for you</h1>
                        <p className="text-base text-gray-500 mt-7 font-normal">The order you are looking for might <br /> probably dont exist</p>
                        <div className="mt-12">
                            <Link to={'/profile'} className="mt-14 rounded-lg py-3 bg-blue-400 text-white px-3">
                                Back to Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
