
import { createSlice } from '@reduxjs/toolkit';


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isLoadingCategory: true,
        category: [],
        activeCategory: null,
        total: 0,
    },
    reducers: {
        onSetActiveCategory: (state, { payload }) => {
            state.activeCategory = payload
        },
        onAddNewCategory: (state, { payload }) => {
            state.category.push(payload);
            state.activeCategory = null;
        },
        onUpdateCategory: (state, { payload }) => {
            state.category = state.category.map(cat => {
                if (cat._id === payload._id) {
                    return payload;
                }

                return cat;
            })
        },
        onDeleteCategory: (state) => {
            if (state.activeCategory) {
                state.category = state.category.filter(cat => cat._id !== state.activeCategory._id);
                state.activeCategory = null;
            }
        },
        onLoadCategory: (state, { payload }) => {
            state.isLoadingCategory = false;
            // state.products = payload;
            payload.category.forEach(cat => {
                const exist = state.category.some(dbcategory => dbcategory._id === cat._id);
                if (!exist) {
                    state.category.push(cat)
                }
            }),
                state.total = payload.total
        },
        onLogoutCategory: (state) => {
            state.isLoadingCategory = true;
            state.category = [];
            state.activeCategory = null
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewCategory,
    onDeleteCategory,
    onLoadCategory,
    onLogoutCategory,
    onSetActiveCategory,
    onUpdateCategory,
} = categorySlice.actions;