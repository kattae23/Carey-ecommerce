import { useState } from "react";
import { useEffect } from "react";
import { useProductStore } from "../../hooks";


export const getProductById = (id) => {

    const { products } = useProductStore();

    const [product, setProduct] = useState([]);
    const pro = products.filter(pro => pro._id === id)

    useEffect(() => {
        if (pro !== undefined || pro.length > 0) {
            setProduct(pro)
        }
    }, [products]);

    if (product.length === 1 ) {
        return product
    } else {
        return []
    }
}
