import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { ecommerceApi } from "../api";
import { onAddNewProduct, onDeleteProduct, onLoadProducts, onSetActiveProduct, onNextPage, onUpdateProduct } from "../store/ecommerce/productsSlice";
import { onLoadCategory } from "../store/ecommerce/categorySlice";
import { getEnvVariables } from "../helpers";
import { onLoadUsers } from "../store/ecommerce/usersSlice";

const { VITE_API_URL } = getEnvVariables()



export const useProductStore = () => {

    const dispatch = useDispatch();
    const { products, activeProduct } = useSelector(state => state.products);
    const { user } = useSelector(state => state.auth);

    const setActiveProduct = (ecommerceproduct) => {
        dispatch(onSetActiveProduct(ecommerceproduct))
    }

    const startSavingProduct = async (ecommerceproduct) => {
        //TODO: Update product

        try {
            if (ecommerceproduct._id) {

                if (ecommerceproduct.file) {

                    const { _id, name, category, available, price, size, color, stock, description } = ecommerceproduct;

                    const { data } = await ecommerceApi.put(`/products/${_id}`, { available, name, category, price, size, color, stock, description });

                    const id = data._id
                    if (ecommerceproduct.file) {
                        setTimeout(async () => {
                            const { data } = await ecommerceApi.put(`/uploads/products/${id}`, { file: ecommerceproduct.file }, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            });
                            dispatch(onDeleteProduct())
                            startLoadingProducts({ limit: 0, page: 0 })
                        }, 200);
                    }
                } else {
                    const { _id, name, category, available, price, size, color, stock, description } = ecommerceproduct;

                    const { data } = await ecommerceApi.put(`/products/${_id}`, { available, name, category, price, size, color, stock, description });

                    dispatch(onUpdateProduct({
                        ...data,
                        user
                    }));
                    return;
                }

                return;
            }

            // Creando con imagen

            if (ecommerceproduct.file) {

                const { name, category, available, price, size, color, stock, description } = ecommerceproduct;

                const { data } = await ecommerceApi.post('/products', { name, category: category._id, available, price, size, color, stock, description });
                const id = data._id
                if (!data.img) {
                    setTimeout(async () => {
                        const { data } = await ecommerceApi.put(`/uploads/products/${id}`, { file: ecommerceproduct.file }, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        });
                        dispatch(onAddNewProduct({
                            ...data,
                            user
                        }));
                    }, 200);
                }
            } else {
                const { name, category, available, price, size, color, stock, description } = ecommerceproduct;
                const { data } = await ecommerceApi.post('/products', { name, category: category._id, price, size, color, stock, description });

                //creando sin imagen


                dispatch(onAddNewProduct({
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
    const startDeletingProduct = async (ecommerceproduct) => {
        // TODO: llegar al backend
        try {
            await ecommerceApi.delete(`/products/${activeProduct._id}`);
            dispatch(onDeleteProduct())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
        }
    }

    const startLoadingProducts = async ({ limit = 0, page = 0 }) => {
        try {
            const { data } = await ecommerceApi.get('/products', {
                params: {
                    "limit": limit,
                    "from": page
                }
            })

            const products = data.products
            dispatch(onLoadProducts({ products, total: data.total }))

        } catch (error) {
            console.log('Error loading products')
            console.log(error)
        }
    }

    const startNextPage = async ({ limit = 0, page = 0 }) => {
        try {
            const { data } = await ecommerceApi.get('/products', {
                params: {
                    "limit": limit,
                    "from": page
                }
            })

            const products = data.products
            products.map(product => {
                product.img = VITE_API_URL + '/uploads/products/' + product._id
                return product;
            })
            dispatch(onNextPage({ products, total: data.total }))

            return data;

        } catch (error) {
            console.log('Error charging the products')
            console.log(error)
        }
    }

    const startSearchProduct = async ({ search = '' }) => {
        try {
            const { data } = await ecommerceApi.get(`/search/products/${search}`)

            const products = data.product
            const userSearch = data.users
            const categorySearch = data.category
            const productCount = data.productCount


            dispatch(onLoadProducts({ products: products, total: productCount }))
            dispatch(onLoadUsers({ users: userSearch, total: userSearch.length }))
            dispatch(onLoadCategory({ category: categorySearch, total: categorySearch.length }))

            // return data;

        } catch (error) {
            console.log('Error searching products')
            console.log(error)
        }
    }

    return {
        //* Propiedades
        activeProduct,
        products,
        hasEvenSelected: !!activeProduct,

        //* Metodos
        setActiveProduct,
        startDeletingProduct,
        startLoadingProducts,
        startSavingProduct,
        startNextPage,
        startSearchProduct

    }
}
