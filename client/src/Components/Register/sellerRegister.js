import React, { useState, useContext } from 'react';
import { GlobalState } from '../../global'; 
import styles from './register.module.css'; 
import { useNavigate } from 'react-router-dom';


const SellerRegister = () => {
    const { sellerRegister } = useContext(GlobalState);
    
    
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        uname: "",
        Company: "", 
        email: "",
        Contact: "",
        password: "",
        Address: "",
        role:"seller"
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

   
    const clearForm = () => {
        setFormData({
            fname: "",
            lname: "",
            uname: "",
            Company: "",
            email: "",
            Contact: "",
            password: "",
            Address: "",
            role:"seller"
        });
    };

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
      
        const backendData = {
            fname: formData.fname,
            lname: formData.lname,
            uname: formData.uname,
            coopname: formData.Company, 
            email: formData.email,
            coopphnNo: formData.Contact, 
            password: formData.password,
            coopAddress: formData.Address ,
            
        };
        console.log(backendData)

        try {
            setMessage(await sellerRegister(backendData)); 
            clearForm();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
               setMessage(err.response.data.message); 
            } else {
                setMessage("Registration failed. Please try again.");
            }
        }
    };

    
    const handleLoginClick = () => {
        navigate('/login'); 
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.innerDiv}>
                <h2>Seller Register</h2>
                {message && <div className={styles.message}>{message}</div>}

                {Object.keys(formData).map(key => (
                    <div key={key} className={styles.formGroup}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type={key === 'password' ? 'password' : 'text'}
                            id={key}
                            value={formData[key]}
                            onChange={handleChange}
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            required
                        />
                    </div>
                ))}

                <button type="submit">Register</button>
                <button type="button" onClick={handleLoginClick}>Login</button>
            </div>
        </form>
    );
};

export default SellerRegister;
