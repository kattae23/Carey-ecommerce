


import { createSlice } from '@reduxjs/toolkit';


export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        isLoadingProducts: true,
        products: [],
        activeProduct: null,
        total: 0,
    },
    reducers: {
        onSetActiveProduct: (state, { payload }) => {
            state.activeProduct = payload
        },
        onAddNewProduct: (state, { payload }) => {
            state.products.push(payload);
            state.activeProduct = null;
        },
        onUpdateProduct: (state, { payload }) => {
            state.products = state.products.map(product => {
                if (product._id === payload._id) {
                    return payload;
                }

                return product;
            })
        },
        onDeleteProduct: (state) => {
            if (state.activeProduct) {
                state.products = state.products.filter(product => product._id !== state.activeProduct._id);
                state.activeProduct = null;
            }
        },
        onLoadProducts: (state, { payload }) => {
            state.isLoadingProducts = false;
            // state.products = payload;
            state.products = payload.products
            state.total = payload.total
        },
        onNextPage: (state, { payload }) => {
            state.products = payload.products;
            state.total = payload.total
            state.activeProduct = null;
        },
        onLogoutProducts: (state) => {
            state.isLoadingProducts = true;
            state.products = [];
            state.activeProduct = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewProduct,
    onDeleteProduct,
    onLoadProducts,
    onLogoutProducts,
    onSetActiveProduct,
    onUpdateProduct,
    onNextPage,
} = productsSlice.actions;