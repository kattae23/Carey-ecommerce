


import { createSlice } from '@reduxjs/toolkit';


export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoadingSearch: true,
        search: [],
        activeSearch: null,
        total: 0,
    },
    reducers: {
        onSetActiveProduct: (state, { payload }) => {
            state.activeSearch = payload
        },
        onAddNewProduct: (state, { payload }) => {
            state.search.push(payload);
            state.activeSearch = null;
        },
        onUpdateProduct: (state, { payload }) => {
            state.search = state.search.map(search => {
                if (search._id === payload._id) {
                    return payload;
                }

                return search;
            })
        },
        onDeleteProduct: (state) => {
            if (state.activeSearch) {
                state.search = state.search.filter(search => search._id !== state.activeSearch._id);
                state.activeSearch = null;
            }
        },
        onLoadProducts: (state, { payload }) => {
            state.isLoadingProducts = false;
            state.search = payload.search
            state.total = payload.total
        },
        onNextPage: (state, { payload }) => {
            state.search = payload.search;
            state.total = payload.total
            state.activeSearch = null;
        },
        onLogoutProducts: (state) => {
            state.isLoadingProducts = true;
            state.search = [];
            state.activeSearch = null
        }
    }
});


export const {
    onAddNewProduct,
    onDeleteProduct,
    onLoadProducts,
    onLogoutProducts,
    onSetActiveProduct,
    onUpdateProduct,
    onNextPage,
} = searchSlice.actions;