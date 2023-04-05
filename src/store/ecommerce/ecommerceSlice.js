

import { createSlice } from '@reduxjs/toolkit';



export const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState: {
        isSaving: false,
        activeCart: null,
        messageSaved: '',
        cart: [],
        amount: 0,
        totalAmount: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart(state, action) {
            const productId = action.payload;
            try {
                const exist = state.cart.find(
                    (product) =>
                        product._id === productId._id &&
                        product.size[0] === productId.size[0] &&
                        product.color[0] === productId.color[0]
                );
                if (exist) {
                    exist.amount++;
                    exist.totalPrice += productId.price;
                    state.totalAmount++;
                    state.totalPrice += productId.price;
                } else {
                    state.cart.push({
                        _id: productId._id,
                        price: productId.price,
                        size: productId.size,
                        amount: 1,
                        user: productId.user,
                        img: productId.img,
                        urlImgThumb: productId.urlImgThumb,
                        totalPrice: productId.price,
                        name: productId.name,
                        description: productId.description,
                        color: productId.color,
                    });
                    state.totalAmount++;
                    state.totalPrice += productId.price;
                }
            } catch (err) {
                return err;
            }
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            try {
                const exist = state.cart.find(
                    (product) =>
                        product._id === productId._id &&
                        product.size[0] === productId.size[0] &&
                        product.color[0] === productId.color[0]
                );
                if (exist.amount === 1) {
                    state.cart = state.cart.filter(
                        (product) =>
                            product._id !== productId._id ||
                            product.size[0] !== productId.size[0] ||
                            product.color[0] !== productId.color[0]
                    );
                    state.totalAmount--;
                    state.totalPrice -= productId.price;
                } else {
                    exist.amount--;
                    exist.totalPrice -= productId.price;
                    state.totalAmount--;
                    state.totalPrice -= productId.price;
                }
            } catch (err) {
                return err;
            }
        },
        onSuccessCart( state, action ) {
            product
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewCart,
    addToCart,
    onDeleteCart,
    onLoadCarts,
    onLogoutCarts,
    onSetActiveCart,
    onUpdateCart,
    onNextPage,
    onTotalPrice,
    onTotalPriceRemove,
    removeFromCart,
} = ecommerceSlice.actions;