import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./header.css";
import { GlobalState } from "../../global";
import { useContext } from "react";

const Header=()=>{
    const {user}=useContext(GlobalState);
    return(
       <header className="Header">

    
        
        <div className="logo">
            <h1>CartCraft</h1>
        </div>

        <div className="Search">

            <form>
                <input type="string" placeholder="Search here" id="inputArea" />
            </form>
        </div>

                {user ? (
        <div className="Profile">
            <FaUserCircle />
            <Link to="/userProfile" className="link">Profile</Link>
        </div>
        ) : (
        <div className="login">
            <FaUserCircle />
            <Link to="/login" className="link" target="_blank">Login</Link>
        </div>
        )}



        <div className="Cart">
            <MdOutlineAddShoppingCart size={20} color="white"/>
        </div>



       </header>
    )

}

export default Header;
