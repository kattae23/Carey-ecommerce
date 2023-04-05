

import { createSlice } from '@reduxjs/toolkit';



export const wishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        isSaving: false,
        wish: [

        ],
        activeWish: null,
        messageSaved: ''
    },
    reducers: {
        onSetActiveWish: (state, { payload }) => {
            state.activeWish = payload
        },
        onAddNewWish: (state, { payload }) => {
            state.wish.push(payload);
            state.activeWish = null;
        },
        onUpdateWish: (state, { payload }) => {
            state.wish = state.wish.map(wish => {
                if (wish._id === payload._id) {
                    return payload;
                }

                return wish;
            })
        },
        onDeleteWish: (state) => {
            if (state.activeWish) {
                state.wish = state.wish.filter(wish => wish._id !== state.activeWish._id);
                state.activeWish = null;
            }
        },
        // onLoadWishes: (state, { payload }) => {
        //     state.isLoadingWishes = false;
        //     // state.wish = payload;
        //     payload.wish.forEach(wish => {
        //         const exist = state.wish.some(dbwish => dbwish._id === wish._id);
        //         if (!exist) {
        //             state.wish.push(wish)
        //         }
        //     }),
        //         state.total = payload.total
        // },
        onLoadWishes: (state, { payload }) => {
            state.isLoadingWishes = false;
            // state.wish = payload;
            state.wish = payload.wish
            state.total = payload.total
        },
        onNextPage: (state, { payload }) => {
            state.wish = payload.wish;
            state.total = payload.total
            state.activeWish = null;
        },
        onLogoutWishes: (state) => {
            state.isLoadingWishes = true;
            state.wish = [];
            state.activeWish = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewWish,
    onDeleteWish,
    onLoadWishes,
    onLogoutWishes,
    onSetActiveWish,
    onUpdateWish,
    onNextPage,
} = wishListSlice.actions;