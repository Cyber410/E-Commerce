import React from "react";
import useProductData from "./utils/productUtils";
import ProductCard from "./utils/productCard";
import styles from "./Products.module.css"; 

const Products = () => {
    const { products } = useProductData();

    return (
        <div className={styles.prdContainer}>
            {products && products.map((product) => {
                return (
                    <div className={styles.Product} key={product._id}>
                        <ProductCard product={product} />
                    </div>
                );
            })}
        </div>
    );
}

export default Products;
