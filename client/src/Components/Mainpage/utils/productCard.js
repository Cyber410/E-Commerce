import React from "react";
import styles from "./productCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    console.log(product)
    const { _id,name, price, description, image } = product;
    const navigate = useNavigate();

   
    const handleBuyClick = () => {
        console.log(_id)
        navigate(`/buy/${_id}`); 
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.Image}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.Name}>{name}</div>
            <div className={styles.Description}>{description}</div>
            <div className={styles.Price}>${price}</div>

            <button type="button" onClick={handleBuyClick}>Buy</button>
            <button type="button" onClick={handleBuyClick}>View</button>
        </div>
    );
};

export default ProductCard;
