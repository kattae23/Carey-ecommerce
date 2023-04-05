

import { createSlice } from '@reduxjs/toolkit';
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isProductModalOpen: false,
        isProductModalOpen2: false,
        isProductModalOpen3: false,
    },
    reducers: {
        onOpenProductModal: (state) => {
            state.isProductModalOpen = true;
        },
        onCloseProductModal: (state) => {
            state.isProductModalOpen = false;
        },
        onOpenProductModal2: (state) => {
            state.isProductModalOpen2 = true;
        },
        onCloseProductModal2: (state) => {
            state.isProductModalOpen2 = false;
        },
        onOpenProductModal3: (state) => {
            state.isProductModalOpen3 = true;
        },
        onCloseProductModal3: (state) => {
            state.isProductModalOpen3 = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenProductModal, onCloseProductModal, onOpenProductModal2, onCloseProductModal2, onOpenProductModal3, onCloseProductModal3 } = uiSlice.actions;
