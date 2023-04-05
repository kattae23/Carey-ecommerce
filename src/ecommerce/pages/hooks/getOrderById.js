import { useState } from "react";
import { useEffect } from "react";
import { useCheckoutStore } from "../../../hooks"

export const getOrderById = (id) => {

    const { checkouts } = useCheckoutStore();

    const [checkout, setCheckout] = useState([]);
    const che = checkouts.filter(che => che.orderId === id)

    useEffect(() => {
        if (che !== undefined || che.length > 0) {
            setCheckout(che)
        }
    }, [checkouts]);

    if (checkout.length === 1) {
        return checkout
    } else {
        return []
    }

}
