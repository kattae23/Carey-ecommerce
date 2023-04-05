import { useDispatch, useSelector } from "react-redux"
import { onCloseProductModal, onOpenProductModal, onOpenProductModal2, onCloseProductModal2, onOpenProductModal3, onCloseProductModal3 } from "../store/ui/uiSlice";



export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isProductModalOpen
    } = useSelector(state => state.ui)

    const openProductModal = () => {
        dispatch(onOpenProductModal())
    }

    const closeProductModal = () => {
        dispatch(onCloseProductModal())
    }

    const toggleProductModal = () => {
        (isProductModalOpen)
            ? openProductModal()
            : closeProductModal()
    }

    const {
        isProductModalOpen2
    } = useSelector(state => state.ui)

    const openProductModal2 = () => {
        dispatch(onOpenProductModal2())
    }

    const closeProductModal2 = () => {
        dispatch(onCloseProductModal2())
    }

    const toggleProductModal2 = () => {
        (isProductModalOpen2)
            ? openProductModal2()
            : closeProductModal2()
    }


    const {
        isProductModalOpen3
    } = useSelector(state => state.ui)

    const openProductModal3 = () => {
        dispatch(onOpenProductModal3())
    }

    const closeProductModal3 = () => {
        dispatch(onCloseProductModal3())
    }

    const toggleProductModal3 = () => {
        (isProductModalOpen3)
            ? openProductModal3()
            : closeProductModal3()
    }

    return {
        //* Properties
        isProductModalOpen,
        //* Metodos
        openProductModal,
        closeProductModal,
        toggleProductModal,

        //* Properties
        isProductModalOpen2,
        //* Metodos
        openProductModal2,
        closeProductModal2,
        toggleProductModal2,


        //* Properties
        isProductModalOpen3,
        //* Metodos
        openProductModal3,
        closeProductModal3,
        toggleProductModal3,
    }

}


