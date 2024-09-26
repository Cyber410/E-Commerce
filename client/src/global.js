import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GlobalState = createContext();

const DataProvider = ({ children }) => {
    const navigate = useNavigate();

    const [Token, setToken] = useState("");
    const [user, setUser] = useState("");

    const register = async (fname, lname, uname, password, email, phnNo, address) => {
        try {
            const response = await axios.post("http://localhost:5000/user/register", {
                fname, lname, uname, password, email, phnNo, address
            });
            return response.data.message;
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                return err.response.data.message;
            } else {
                return "Registration failed! Try Again";
            }
        }
    };

    const sellerRegister = async (formData) => {
        try {
            const response = await axios.post("http://localhost:5000/user/registerSeller", {
                ...formData
            });
            console.log(response);
            return response.data.message;
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                return err.response.data.message;
            } else {
                return "Registration failed! Try Again.";
            }
        }
    };

    const login = async (uname, password) => {
        try {
            const response = await axios.post("http://localhost:5000/user/userLogin", { uname, password });
            const Token = response.data.cookie;
            setToken(Token);
            const user = response.data.user;
            setUser(user);
            localStorage.setItem('token', Token);

            if (user) {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const sellerLogin = async (uname, password) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/user/sellerLogin",
                { uname, password },
                {
                    withCredentials: true
                }
            );
            
            
            const user = response.data.seller;
            setUser(user);
           
            if (response.data.loggedin === "true") {
                console.log("Login successful");
            }
    
            if (user) {
                navigate("/sellerIndex");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    
    const adminLogin = async (uname, password, empNo) => {
        try {
            const response = await axios.post("http://localhost:5000/user/adminLogin", { uname, password, empNo });
            const Token = response.data.cookie;
            setToken(Token);
            localStorage.setItem('token', Token);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const getUserProfile = async (uname, email) => {
        try {
           
            const response = await axios.get("http://localhost:5000/user/userProfile", {
                params: { uname, email }
            });
    
          
            if (response.status === 200) {
                const { message, profile } = response.data;
                return { message, profile };
            } else {
                throw new Error(`Server responded with status code ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw new Error("Failed to fetch user profile. Please try again later.");
        }
    };
    
   
    const addProduct = async (productData) => {
        try {
            const formData = new FormData();
            for (const key in productData) {
                formData.append(key, productData[key]);
            }

            const response = await axios.post("http://localhost:5000/products/addProduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                    
                },
                withCredentials: true
            });
            return response.data.message;
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                return err.response.data.message;
            } else {
                return "Failed to add product. Try again.";
            }
        }
    };

    const state = {
        Token,
        user,
        register,
        login,
        getUserProfile,
        sellerRegister,
        sellerLogin,
        adminLogin,
        addProduct 
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};

export { GlobalState, DataProvider };
