import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { ecommerceApi } from "../api";
import { onAddNewCheckout, onDeleteCheckout, onLoadcheckouts, onSetActiveCheckout, onUpdateCheckout } from "../store/ecommerce/checkoutSlice";



export const useCheckoutStore = () => {

    const dispatch = useDispatch();
    const { checkouts, activeCheckout } = useSelector(state => state.checkouts);
    const { user } = useSelector(state => state.auth);

    const setActiveCheckout = (ecommerceCheckout) => {
        dispatch(onSetActiveCheckout(ecommerceCheckout))
    }

    const startSavingCheckout = async (ecommerceCheckout) => {
        //TODO: Update Checkout


        try {
            if (ecommerceCheckout._id) {
                // Actualizando
                const { _id, name, status, enabled } = ecommerceCheckout;
                await ecommerceApi.put(`/checkout/${_id}`, { enabled, name, status, status });
                dispatch(onUpdateCheckout({ ...ecommerceCheckout, user }));
                return;
            }

            // Creando
            const { data } = await ecommerceApi.post('/Checkout', ecommerceCheckout);
            dispatch(onAddNewCheckout({ _id: data.Checkout._id, name: data.Checkout.name, user }));
        } catch (error) {

            console.log(error)
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')

        }

        //* Todo bien
    }

    const startDeletingCheckout = async () => {
        // TODO: llegar al backend
        try {
            await ecommerceApi.delete(`/Checkout/${activeCheckout.id}`)
            dispatch(onDeleteCheckout())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    }

    const startLoadingCheckouts = async () => {
        try {
            const { data } = await ecommerceApi.get('/checkout', {
                params: {
                    "limit": 0,
                }
            })
            dispatch(onLoadcheckouts(data))
        } catch (error) {
            console.log('Error loading checkouts')
            console.log(error)
        }
    }

    const startUpdateCheckoutFormUser = async ({ address, orderId, user, cart, totalPrice, seller }) => {


        try {

            const { data } = await ecommerceApi.post(`/checkout/order`, { address, orderId, user, cart, totalPrice, seller });

            dispatch(onAddNewCheckout({
                ...data
            }));
            return data

        } catch (error) {
            Swal.fire('error while updating', error.response.data?.errors[0].msg || '---', 'error')
        }
    }

    return {
        //* Propiedades
        activeCheckout,
        checkouts,
        hasEvenSelected: !!activeCheckout,

        //* Metodos
        setActiveCheckout,
        startDeletingCheckout,
        startLoadingCheckouts,
        startSavingCheckout,
        startUpdateCheckoutFormUser

    }
}
