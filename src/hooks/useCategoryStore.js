import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { ecommerceApi } from "../api";
import {
    onAddNewCategory,
    onDeleteCategory,
    onLoadCategory,
    onLogoutCategory,
    onSetActiveCategory,
    onUpdateCategory,
} from "../store/ecommerce/categorySlice";



export const useCategoryStore = () => {

    const dispatch = useDispatch();
    const { category, activeCategory } = useSelector(state => state.category);
    const { user } = useSelector(state => state.auth);

    const setActiveCategory = (ecommercecategory) => {
        dispatch(onSetActiveCategory(ecommercecategory))
    }

    const startSavingCategory = async (ecommercecategory) => {
        //TODO: Update category


        try {
            if (ecommercecategory._id) {
                // Actualizando
                const { _id, name, status, enabled  } = ecommercecategory;
                await ecommerceApi.put(`/category/${_id}`, { enabled, name, status,status });
                dispatch(onUpdateCategory({ ...ecommercecategory, user }));
                return;
            }

            // Creando
            const { data } = await ecommerceApi.post('/category', ecommercecategory);
            dispatch(onAddNewCategory({ _id: data.category._id, name: data.category.name, user }));
        } catch (error) {

            console.log(error)
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')

        }

        //* Todo bien
    }

    const startDeletingCategory = async () => {
        // TODO: llegar al backend
        try {
            await ecommerceApi.delete(`/category/${activeCategory.id}`)
            dispatch(onDeleteCategory())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    }

    const startLoadingCategory = async () => {
        try {
            const { data } = await ecommerceApi.get('/category', {
                params: {
                    "limit": 0,
                }
            })
            dispatch(onLoadCategory(data))
        } catch (error) {
            console.log('Error loading categories')
            console.log(error)
        }
    }

    return {
        //* Propiedades
        activeCategory,
        category,
        hasEvenSelected: !!activeCategory,

        //* Metodos
        setActiveCategory,
        startDeletingCategory,
        startLoadingCategory,
        startSavingCategory,

    }
}
