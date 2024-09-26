import React, { useContext, useState } from 'react';
import { GlobalState } from "../../global.js";
import { useNavigate } from 'react-router-dom';
import styles from './sellerLogin.module.css';

function SellerLogin() {
    const { sellerLogin } = useContext(GlobalState);
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUname(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sellerLogin(uname, password); 
       
    }

    const handleBackClick = () => {
        navigate('/login');
    }

    const handleRegisterClick = () => {
        navigate('/sellerRegister');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.innerDiv}>
                <h2>Seller Login</h2>
                
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={uname}
                        onChange={handleUsername}
                        placeholder='Username'
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePassword}
                        placeholder='Password'
                        required
                    />
                </div>

                <button type="submit">Login</button>
                <button type="button" onClick={handleRegisterClick}>Register</button>
                <button type="button" onClick={handleBackClick}>Back</button>
            </div>
        </form>
    );
}

export default SellerLogin;
