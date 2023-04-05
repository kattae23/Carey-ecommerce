
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { RegisterPage, RenewPassword, ResetPassword } from '../auth'
import { LoginPage } from '../auth/pages/LoginPage'
import { Billings, Notifications, PasswordSecurity, ProfileSettings, Spinner } from '../ecommerce/components'
import { CartList } from '../ecommerce/components/CartList'
import { AboutPage, CollectionPage, ContactPage, HomePage, OrderPage, ProductPage, ProfilePage, SearchPage } from '../ecommerce/pages'
import CheckoutPage from '../ecommerce/pages/CheckoutPage'
import { SalesPage } from '../ecommerce/pages/SalesPage'
import SettingsPage from '../ecommerce/pages/SettingsPage'
import { useAuthStore, useCategoryStore, useCheckoutStore, useProductStore } from '../hooks'
import ErrorPage from './ErrorPage'
import config from '../config/config.json';

const stripeId = config.STRIPE_PUBLIC_KEY;

export const stripePromise = loadStripe(stripeId);

export const AppRouter = () => {


    const { checkAuthToken, status } = useAuthStore()
    const { startLoadingProducts } = useProductStore()
    const { startLoadingCategory } = useCategoryStore()
    const { startLoadingCheckouts } = useCheckoutStore()

    const { totalAmount } = useSelector(state => state.ecommerce)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        startLoadingProducts({ limit: 0 })
        checkAuthToken()
        startLoadingCheckouts()
        startLoadingCategory()
    }, []);

    if (status === 'checking') {
        return (
            <div className='w-screen h-screen flex flex-col justify-center items-center'>
                <Spinner />
            </div>
        )
    }

    const { pathname } = useLocation()

    const lastPath = pathname;
    localStorage.setItem('lastpath', lastPath)


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
            <Routes>
                <Route path="/home" element={<HomePage />} errorElement={<ErrorPage />} />
                <Route path="/search" element={<SearchPage />} errorElement={<ErrorPage />} />
                <Route path="/collection" element={<CollectionPage />} errorElement={<ErrorPage />} />
                <Route path="/about" element={<AboutPage />} errorElement={<ErrorPage />} />
                <Route path="/contact" element={<ContactPage />} errorElement={<ErrorPage />} />
                <Route path="/product/:id" element={<ProductPage />} errorElement={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/home" />} errorElement={<ErrorPage />} />
                <Route path="/" element={<Navigate to="/home" />} errorElement={<ErrorPage />} />
                <Route path='/order/:id' element={<OrderPage />} errorElement={<ErrorPage />} />
                <Route path='/sales/:id' element={<SalesPage />} errorElement={<ErrorPage />} />
                <Route path='/auth/reset-password/:id/:token' element={<ResetPassword />} errorElement={<ErrorPage />} />
                {
                    (status === 'not-authenticated' || status === 'checking')
                        ? (
                            <>
                                <Route path='/auth/*' element={<LoginPage />} errorElement={<ErrorPage />} />
                                <Route path='/auth/login' element={<LoginPage />} errorElement={<ErrorPage />} />
                                <Route path='/auth/register' element={<RegisterPage />} errorElement={<ErrorPage />} />
                                <Route path='/auth/renew-password' element={<RenewPassword />} errorElement={<ErrorPage />} />
                            </>
                        )
                        : (
                            <>
                                <Route path='/auth/*' element={<Navigate to='/home' />} errorElement={<ErrorPage />} />
                            </>
                        )
                }
                {
                    (status === 'authenticated')
                        ? (
                            <>
                                <Route path="/settings" element={<SettingsPage />} errorElement={<ErrorPage />}>
                                    <Route path="profile" element={<ProfileSettings />} errorElement={<ErrorPage />} />
                                    <Route path="password" element={<PasswordSecurity />} errorElement={<ErrorPage />} />
                                    <Route path="billings" element={<Billings />} errorElement={<ErrorPage />} />
                                    <Route path="notifications" element={<Notifications />} errorElement={<ErrorPage />} />
                                    <Route path="cart" element={<CartList />} errorElement={<ErrorPage />} />
                                </Route>
                                <Route path="/profile" element={<ProfilePage />} errorElement={<ErrorPage />} />
                                {
                                    (totalAmount !== 0 && user.city && user.address && user.state && user.country && user.zipcode && user.phone) ? (
                                        <Route path="/checkout" element={
                                            <Elements stripe={stripePromise} options={options}>
                                                <CheckoutPage />
                                            </Elements>
                                        } errorElement={<ErrorPage />} />
                                    )
                                        : <Route path='/checkout' element={<Navigate to='/home' />} errorElement={<ErrorPage />} />
                                }
                                <Route path='/order/:id' element={<OrderPage />} errorElement={<ErrorPage />} />
                            </>
                        )
                        : (
                            <>
                                <Route path='/settings' element={<Navigate to='/*' />} errorElement={<ErrorPage />} />
                                <Route path='/profile' element={<Navigate to='/*' />} errorElement={<ErrorPage />} />
                            </>
                        )
                }
            </Routes>
        </>
    )
}
