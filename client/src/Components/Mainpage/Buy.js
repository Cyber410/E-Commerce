import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./ProductBuyPage.module.css"; 

const ProductBuyPage = () => {
    const { productId } = useParams(); // Use useParams to get route parameters
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            console.log(productId)
            try {
                const response = await axios.get(`http://localhost:5000/products/${productId}`);

                setProduct(response.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!product) {
        return <div className={styles.noProduct}>Product not found</div>;
    }

    const {
        title,
        image,
        description,
        price,
        category,
        stock,
        discount,
        rating,
        reviews,
        brand,
        seller
    } = product;

    return (
        <div className={styles.productBuyPage}>
            <div className={styles.productImage}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.productDetails}>
                <h1>{title}</h1>
                <p><strong>Brand:</strong> {brand}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Price:</strong> ${price.toFixed(2)}</p>
                {discount > 0 && <p><strong>Discount:</strong> {discount}%</p>}
                <p><strong>Rating:</strong> {rating} ★</p>
                <p><strong>Stock:</strong> {stock > 0 ? `${stock} available` : 'Out of stock'}</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Seller:</strong> {seller}</p>
                <div className={styles.reviews}>
                    <h2>Reviews</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className={styles.review}>
                                <p><strong>{review.reviewerName}:</strong> {review.comment}</p>
                                <p><strong>Rating:</strong> {review.rating} ★</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
                <button
                    className={styles.buyButton}
                    disabled={stock === 0}
                    onClick={() => alert('Proceed to checkout')}
                >
                    {stock > 0 ? 'Buy Now' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
};

export default ProductBuyPage;
