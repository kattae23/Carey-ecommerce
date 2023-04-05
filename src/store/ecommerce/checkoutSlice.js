
import { createSlice } from '@reduxjs/toolkit';


export const checkoutsSlice = createSlice({
    name: 'checkouts',
    initialState: {
        isLoadingcheckouts: true,
        checkouts: [],
        activeCheckout: null,
        total: 0,
    },
    reducers: {
        onSetActiveCheckout: (state, { payload }) => {
            state.activeCheckout = payload
        },
        onAddNewCheckout: (state, { payload }) => {
            state.checkouts.push(payload.checkout);
            state.activeCheckout = null;
        },
        onUpdateCheckout: (state, { payload }) => {
            state.checkouts = state.checkouts.map(Checkout => {
                if (Checkout._id === payload._id) {
                    return payload;
                }

                return Checkout;
            })
        },
        onDeleteCheckout: (state) => {
            if (state.activeCheckout) {
                state.checkouts = state.checkouts.filter(Checkout => Checkout._id !== state.activeCheckout._id);
                state.activeCheckout = null;
            }
        },
        onLoadcheckouts: (state, { payload }) => {
            state.isLoadingcheckouts = false;
            // state.checkouts = payload;
            state.checkouts = payload.checkouts
            state.total = payload.total
        },
        onNextPage: (state, { payload }) => {
            state.checkouts = payload.checkouts;
            state.total = payload.total
            state.activeCheckout = null;
        },
        onLogoutcheckouts: (state) => {
            state.isLoadingcheckouts = true;
            state.checkouts = [];
            state.activeCheckout = null
        }
    }
});


export const {
    onAddNewCheckout,
    onDeleteCheckout,
    onLoadcheckouts,
    onLogoutcheckouts,
    onSetActiveCheckout,
    onUpdateCheckout,
    onNextPage,
} = checkoutsSlice.actions;