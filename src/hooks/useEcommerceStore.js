import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { ecommerceApi } from "../api";
import {
    onAddNewCart,
    onDeleteCart,
    onLoadCarts,
    onLogoutCarts,
    onSetActiveCart,
    onUpdateCart,
    onNextPage,
} from "../store/ecommerce/ecommerceSlice";
import { getEnvVariables } from "../helpers";
import { onLoadUsers } from "../store/ecommerce/usersSlice";

const { VITE_API_URL } = getEnvVariables()



export const useEcommerceStore = () => {

    const dispatch = useDispatch();
    const { carts, activeCart } = useSelector(state => state.carts);
    const { user } = useSelector(state => state.auth);

    const setActiveCart = (ecommercecart) => {
        dispatch(onSetActiveCart(ecommercecart))
    }

    const startSavingCart = async (ecommercecart) => {
        //TODO: Update cart

        try {
            if (ecommercecart._id) {

                if (ecommercecart.file) {

                    const { _id, name, category, available, price } = ecommercecart;

                    const { data } = await ecommerceApi.put(`/carts/${_id}`, { available, name, category, price });

                    const id = data._id
                    if (ecommercecart.file) {
                        setTimeout(async () => {
                            const { data } = await ecommerceApi.put(`/uploads/carts/${id}`, { file: ecommercecart.file }, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            });
                            dispatch(onDeleteCart())
                            startLoadingCarts({ limit: 0, page: 0 })
                        }, 200);
                    }
                } else {
                    const { _id, name, category, available, price } = ecommercecart;

                    const { data } = await ecommerceApi.put(`/carts/${_id}`, { available, name, category, price });

                    dispatch(onUpdateCart({
                        ...data,
                        user
                    }));
                    return;
                }

                return;
            }

            // Creando con imagen

            if (ecommercecart.file.length > 0) {

                const { data } = await ecommerceApi.post('/carts', ecommercecart);
                const id = data._id
                if (!data.img) {
                    setTimeout(async () => {
                        const { data } = await ecommerceApi.put(`/uploads/carts/${id}`, { file: ecommercecart.file[0] }, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });
                        dispatch(onAddNewCart({
                            ...data,
                            user
                        }));
                    }, 200);
                }
            } else {
                const { data } = await ecommerceApi.post('/carts', ecommercecart);

                //creando sin imagen


                dispatch(onAddNewCart({
                    ...data,
                    user
                }));
            }
        } catch (error) {

            console.log(error)
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')

        } finally {
        }

        //* Todo bien
    }
    const startDeletingCart = async (ecommercecart) => {
        // TODO: llegar al backend
        try {
            await ecommerceApi.delete(`/carts/${activeCart._id}`);
            dispatch(onDeleteCart())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    }

    const startLoadingCarts = async ({ limit = 0, page = 0 }) => {
        try {
            const { data } = await ecommerceApi.get('/carts', {
                params: {
                    "limit": limit,
                    "from": page
                }
            })

            const carts = data.carts
            dispatch(onLoadCarts({ carts, total: data.total }))

        } catch (error) {
            console.log('Error loading carts')
            console.log(error)
        }
    }

    const startNextPage = async ({ limit = 0, page = 0 }) => {
        try {
            const { data } = await ecommerceApi.get('/carts', {
                params: {
                    "limit": limit,
                    "from": page
                }
            })

            const carts = data.carts
            carts.map(cart => {
                cart.img = VITE_API_URL + '/uploads/carts/' + cart._id
                return cart;
            })
            dispatch(onNextPage({ carts, total: data.total }))

            return data;

        } catch (error) {
            console.log('Error loading carts')
            console.log(error)
        }
    }

    const startSearchCart = async ({ search = '' }) => {
        try {
            const { data } = await ecommerceApi.get(`/search/carts/${search}`)

            const carts = data.cart
            const userSearch = data.users
            dispatch(onLoadCarts({ carts: carts, total: carts.length }))
            dispatch(onLoadUsers({ users: userSearch, total: userSearch.length }))

            // return data;

        } catch (error) {
            console.log('Error searching carts')
            console.log(error)
        }
    }

    return {
        //* Propiedades
        activeCart,
        carts,
        hasEvenSelected: !!activeCart,

        //* Metodos
        setActiveCart,
        startDeletingCart,
        startLoadingCarts,
        startSavingCart,
        startNextPage,
        startSearchCart

    }
}
