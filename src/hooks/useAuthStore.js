import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ecommerceApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout, onUpdateUser, onUpdateUserImg } from "../store/auth/authSlice"

import { getEnvVariables } from "../helpers";
import Swal from "sweetalert2";
import { onAddNewCheckout, onUpdateCheckout } from "../store/ecommerce/checkoutSlice";

const { VITE_API_URL } = getEnvVariables()

export const useAuthStore = () => {

    const { status, user, errorMessage, } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking())

        try {
            const { data } = await ecommerceApi.post('/auth/login', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                ...data.user
            }))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '---'));
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const startRegister = async ({ firstName, lastName, email, password }) => {

        dispatch(onChecking())

        try {
            const { data } = await ecommerceApi.post('/users', { firstName, lastName, email, password, role: 'USER_ROLE' })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
                uid: data.user.uid,
                role: data.user.role,
                status: data.user.status,
                google: data.user.google,
                ...data.user
            }))

        } catch (error) {
            console.log(error.response.data?.errors[0].msg)
            dispatch(onLogout(error.response.data?.errors[0].msg || '---'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

    const checkAuthToken = async () => {

        dispatch(onChecking())
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await ecommerceApi.get('/auth/renew');
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email: data.user.email,
                uid: data.user.uid,
                role: data.user.role,
                status: data.user.status,
                google: data.user.google,
                ...data.user
            }))
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
            dispatch(onLogout());
        }
    }

    const startLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(onLogout());
    }

    const startUpdateUser = async ({ firstName, lastName, email, password, id, state, city, address, country, zipcode, phone }) => {
        //TODO: Update Event
        try {
            if (id) {
                const { data } = await ecommerceApi.put(`/users/${id}`, { firstName, lastName, email, password, state, city, address, country, zipcode, role: user.role, phone });
                dispatch(onUpdateUser({
                    ...data
                }));
                return data
            }

        } catch (error) {
            Swal.fire('error while updating', error.response.data?.errors[0].msg || '---', 'error')
            return error
        }

        //* Todo bien
    }

    const startUpdateUserImg = async ({ file, id }) => {
        //TODO: Update Event

        try {
            if (id) {

                const { data } = await ecommerceApi.put(`/uploads/users/${id}`, { file }, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                dispatch(onUpdateUserImg({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    uid: data.uid,
                    role: data.role,
                    status: data.status,
                    ...data
                }));
                return data
            }

        } catch (error) {

            console.log(error)
            Swal.fire('Error saving data', error.response.data?.msg, 'error')
        }

        //* Todo bien

    }

    const startUpdateUserBackground = async ({ file, id }) => {
        //TODO: Update Event

        try {
            if (id) {

                const { data } = await ecommerceApi.put(`/uploads/backgrounds/${id}`, { file }, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                dispatch(onUpdateUserImg({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    uid: data.uid,
                    role: data.role,
                    status: data.status,
                    google: data.google,
                    ...data
                }));
                return;
            }

        } catch (error) {

            console.log(error)
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')

        }

        //* Todo bien
    }



    return {
        //* propiedades
        errorMessage,
        status,
        user,

        //* Metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
        startUpdateUser,
        startUpdateUserImg,
        startUpdateUserBackground,
    }
}