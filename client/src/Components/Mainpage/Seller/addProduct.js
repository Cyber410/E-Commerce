import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../global'; 
import styles from './AddProduct.module.css'; 

const AddProductPage = () => {
    const { addProduct, user } = useContext(GlobalState); 
    const [productData, setProductData] = useState({
        productId: '',
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        discount: '',
        brand: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setProductData({
            ...productData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const updatedProductData = {
            ...productData,
            seller: user.id,  
            role: "seller"    
        };

        console.log(updatedProductData);

        const message = await addProduct(updatedProductData);  
        alert(message);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.addProductForm}>
            <div>
                <label>Product ID</label>
                <input
                    type="text"
                    name="productId"
                    value={productData.productId}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                />
            </div>

            <div>
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div>
                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div>
                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div>
                <label>Discount (%)</label>
                <input
                    type="number"
                    name="discount"
                    value={productData.discount}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            <div>
                <label>Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
            </div>

            <div>
                <label>Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className={styles.input}
                />
            </div>

            <button type="submit" className={styles.button}>Add Product</button>
        </form>
    );
};

export default AddProductPage; 