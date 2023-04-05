import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { contactSlice } from "./contact/contactSlice";
import { categorySlice } from "./ecommerce/categorySlice";
import { checkoutsSlice } from "./ecommerce/checkoutSlice";
import { ecommerceSlice } from "./ecommerce/ecommerceSlice";
import { productsSlice } from "./ecommerce/productsSlice";
import { salesSlice } from "./ecommerce/salesSlice";
import { searchSlice } from "./ecommerce/searchSlice";
import { usersSlice } from "./ecommerce/usersSlice";
import { wishListSlice } from "./ecommerce/wishListSlice";
import { uiSlice } from "./ui/uiSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ecommerce: ecommerceSlice.reducer,
        products: productsSlice.reducer,
        contact: contactSlice.reducer,
        ui: uiSlice.reducer,
        category: categorySlice.reducer,
        search: searchSlice.reducer,
        users: usersSlice.reducer,
        wishes: wishListSlice.reducer,
        checkouts: checkoutsSlice.reducer,
        sales: salesSlice.reducer,
    }
})