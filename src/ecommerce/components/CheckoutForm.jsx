import { useStripe } from '@stripe/react-stripe-js'
import { useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ecommerceApi } from '../../api';
import { useCheckoutStore } from '../../hooks';
import { Spinner } from './Spinner';

export const CheckoutForm = ({ totalPrice, user, cart }) => {

    const { startUpdateCheckoutFormUser } = useCheckoutStore();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()


    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    const [isStripeLoading, setIsStripLoading] = useState(true)

    useEffect(() => {
        if (elements) {
            const element = elements.getElement(CardElement)
            element.on('ready', () => {
                setIsStripLoading(false)
            })
        }
    }, [elements])

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                fontFamily: 'Arial, sans-serif',
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                address: {
                    city: user.city,
                    line1: user.address,
                    country: user.country,
                    line2: user.address,
                    postal_code: user.zipcode,
                    state: user.state
                },
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                phone: user.phone
            },
        }
        );



        if (!error) {
            const { id, billing_details, card } = paymentMethod;

            setIsLoading(true)

            try {
                const { data } = await ecommerceApi.post('/checkout', {
                    id,
                    amount: totalPrice * 100,
                    email: user.email,
                    name: `${user.firstName + ' ' + user.lastName}`,
                    phone: user.phone,
                    description: cart.description,
                    billing_details: {
                        ...billing_details
                    },
                })

                const { client_secret } = data;


                if (data.status === "succeeded") {
                    const { shipping, id: id2 } = data;

                    const orderId = id2

                    const { address } = shipping

                    const rest = await startUpdateCheckoutFormUser({ address, orderId, user: user, cart, totalPrice: totalPrice, seller: cart.map( car => car.user._id) })

                    const sell = async () => {

                        await ecommerceApi.put(`/users/${asda}`)

                    }

                    if (rest) {
                        setIsLoading(false)
                    }

                    if (rest) {
                        navigate(`/order/${orderId}`)
                    }
                } else {

                }
                // elements.getElement(CardElement).clear();
            } catch (error) {
                console.log(error)
            }

        }
    }

    return (
        <>
            <div className='mb-5 mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">City</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>{user.city}</span>
                            </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">Country</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>{user.country}</span>
                            </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">State</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>{user.state}</span>
                            </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">Zip Code</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>#{user.zipcode}</span>
                            </div>
                        </div>
                        <div className="w-full flex mb-3 items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">Billing Address</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>{user.address}</span>
                            </div>
                        </div>
                        <div className="w-full flex items-center">
                            <div className="w-32">
                                <span className="text-gray-600 font-semibold">Phone Number</span>
                            </div>
                            <div className="flex-grow pl-3">
                                <span>{user.phone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                        <div className="w-full p-3 border-b border-gray-200">
                            <div className="mb-5">
                                <label htmlFor="type1" className="flex items-center cursor-pointer" />
                                <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" defaultChecked />
                                <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" className="h-6 ml-3" />
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                {isStripeLoading && <Spinner />}
                            </div>
                            <div className='w-full h-auto'>
                                <CardElement options={cardStyle} onChange={handleChange} />
                                <h1 className='my-5 text-sm font-medium text-gray-600'>{error}</h1>
                            </div>
                        </div>
                        <div className="w-full p-3">
                            <label htmlFor="type2" className="flex items-center cursor-pointer">
                                <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" className="ml-3" />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                            disabled={processing || disabled || succeeded}
                        >
                            {isLoading ? (
                                <Spinner />
                            )
                                : "Buy"
                            }</button>
                    </div>
                </form>
            </div>
        </>
    )
}
