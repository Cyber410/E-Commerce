import React, { useEffect, useState } from "react";
import axios from "axios";

const useProductData = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products/getProducts");
            const productData = response.data.products;
            setProducts(productData);
        } catch (err) {
            console.log(err);
            throw err;
        } 
    }

    useEffect(() => {
        getProducts();
    }, []);

    return {
        products
    };
}

export default useProductData;
