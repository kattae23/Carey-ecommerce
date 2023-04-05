
import { useSelector } from "react-redux";
import { Footer, Navbar } from "../../ui/components";
import { getEnvVariables } from "../../helpers";
import { CheckoutForm } from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import { ecommerceApi } from "../../api";
import { AddressElement } from "@stripe/react-stripe-js";

export const { STRIPE_PUBLIC_KEY } = getEnvVariables()

export const stripePromise = loadStripe('pk_test_51MkvOeFHVls21xtrPRxOWEWB95uQNVmX4ct1i3ll01My3Vk4gPRjT2R7FtWfEKPAaFiFq9CAd2zBkkkSeLRIHmSw00ibKTsVo3')

export default function CheckoutPage() {



  const taxes = 19.09

  const { cart, totalPrice, totalAmount } = useSelector(state => state.ecommerce)
  const { user } = useSelector(state => state.auth)

  const productsFiltered = () => {

    return cart.map(cart => cart)
  }


  const appearance = {
    theme: 'stripe',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };

  const options = {
    // Fully customizable with appearance API.
    appearance: appearance,
  };



  return (
    <>
      <Navbar />
      <div className="min-w-screen min-h-screen bg-gray-50 py-5 px-10">
        <div className="px-5">
          <div className="mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Checkout.</h1>
          </div>
        </div>
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                <div className="w-full mx-auto overflow-y-auto h-auto max-h-56">
                  {
                    productsFiltered().map((product, index) => (
                      <div key={index} className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                        <div className="w-full flex items-center">
                          <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                            <img src={product.urlImgThumb} alt={`${product.name + ' image'}`} />
                          </div>
                          <div className="flex-grow pl-3">
                            <h6 className="font-semibold uppercase text-gray-600">{product.name}</h6>
                            <p className="text-gray-400">x {product.amount}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-600 text-xl">${product.price * product.amount}</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">${totalPrice}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Taxes (GST)</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$19.09</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold text-gray-400 text-sm">USD</span> <span className="font-semibold">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-5/12">
                {
                  stripePromise && (
                      <CheckoutForm cart={cart} user={user} totalPrice={totalPrice} />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}