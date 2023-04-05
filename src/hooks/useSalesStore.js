import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { ecommerceApi } from "../api";
import { onUpdateCheckout } from "../store/ecommerce/checkoutSlice";
import {
    onSetActiveSale,
} from "../store/ecommerce/salesSlice";



export const useSaleStore = () => {

    const dispatch = useDispatch();
    const { sales, activeSale } = useSelector(state => state.sales);
    const { user } = useSelector(state => state.auth);

    const setActiveSale = (ecommerceSale) => {
        dispatch(onSetActiveSale(ecommerceSale))
    }

 
    const startUpdateSaleFormUser = async ({ id, orderId, shipped }) => {

        try {

            const { data } = await ecommerceApi.put(`/checkout/order/${id}`, {shipped, orderId});

            dispatch(onUpdateCheckout({
                ...data
            }));

        } catch (error) {
            Swal.fire('error while updating', error.response.data?.errors || '---', 'error')
        }
    }

    return {
        //* Propiedades
        activeSale,
        sales,
        hasEvenSelected: !!activeSale,

        //* Metodos
        startUpdateSaleFormUser

    }
}
