


import { createSlice } from '@reduxjs/toolkit';


export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        isLoadingSales: true,
        sales: [],
        activeSale: null,
        total: 0,
    },
    reducers: {
        onSetActiveSale: (state, { payload }) => {
            state.activeSale = payload
        },
        onAddNewSale: (state, { payload }) => {
            state.sales.push(payload.Sale);
            state.activeSale = null;
        },
        onUpdateSale: (state, { payload }) => {
            state.sales = state.sales.map(Sale => {
                if (Sale._id === payload._id) {
                    return payload;
                }

                return Sale;
            })
        },
        onDeleteSale: (state) => {
            if (state.activeSale) {
                state.sales = state.sales.filter(Sale => Sale._id !== state.activeSale._id);
                state.activeSale = null;
            }
        },
        onLoadSales: (state, { payload }) => {
            state.isLoadingSales = false;
            // state.sales = payload;
            state.sales = payload.sales
            state.total = payload.total
        },
        onNextPage: (state, { payload }) => {
            state.sales = payload.sales;
            state.total = payload.total
            state.activeSale = null;
        },
        onLogoutSales: (state) => {
            state.isLoadingSales = true;
            state.sales = [];
            state.activeSale = null
        }
    }
});


export const {
    onAddNewSale,
    onDeleteSale,
    onLoadSales,
    onLogoutSales,
    onSetActiveSale,
    onUpdateSale,
    onNextPage,
} = salesSlice.actions;