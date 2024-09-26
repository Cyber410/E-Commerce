import React, { useState, useContext } from 'react';
import { GlobalState } from '../../global'; // Adjust the path as needed
import styles from './register.module.css'; // Import the CSS module correctly
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(GlobalState);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phnNo, setPhnNo] = useState("");
    const [address, setAddress] = useState("");
    const [message,setMessage]=useState("");
    const navigate=useNavigate();

    const clearForm = () => {
        setFname("");
        setLname("");
        setUname("");
        setPassword("");
        setEmail("");
        setPhnNo("");
        setAddress("");
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage(await register(fname, lname, uname, password, email, phnNo, address));
            clearForm();
            
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
               setMessage(err.response.data.message); 
               
            } else {
                
                throw new Error("Registration failed. Please try again.");
                
            }
            
        }
    };

    const handleLoginClick = () => {
        navigate('/login'); 
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.innerDiv}>
                <h2>Register</h2>
                {message && <div className={styles.message}>{message}</div>}

                <div className={styles.formGroup}>
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="First Name"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        id="lname"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        placeholder="Last Name"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="uname">Username:</label>
                    <input
                        type="text"
                        id="uname"
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phnNo">Phone Number:</label>
                    <input
                        type="text"
                        id="phnNo"
                        value={phnNo}
                        onChange={(e) => setPhnNo(e.target.value)}
                        placeholder="Phone Number"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        required
                    />
                </div>

                <button type="submit">Register</button>
                <button onClick={handleLoginClick}>Login</button>
            </div>
        </form>
    );
};

export default Register;
