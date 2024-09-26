import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/header";
import Products from "./Components/Mainpage/products";
import Login from "./Components/Login/login"; 
import Register from "./Components/Register/register";
import Seller from "./Components/Login/sellerLogin";
import Admin from "./Components/Login/adminLogin";
import SellerRegister from "./Components/Register/sellerRegister";
import Profile from "./Components/Mainpage/profile";
import  ProductBuyPage from "./Components/Mainpage/Buy";
import AddProductPage from "./Components/Mainpage/Seller/addProduct";
import SellerHeader from "./Components/Mainpage/Seller/SellerHeader";
import { DataProvider } from "./global";

const App = () => {
  return (
    <Router>
      <DataProvider>
        <HeaderRender />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sellerRegister" element={<SellerRegister />} />
          <Route path="/userProfile" element={<Profile />} />
          <Route path="/buy/:productId" element={<ProductBuyPage />} />
          <Route path="/addProduct" element={<AddProductPage />}/>
          <Route path="/sellerIndex" element={<SellerHeader />}/>
          
          {/* Add more routes as needed */}
        </Routes>
      </DataProvider>
    </Router>
  );
};

const HeaderRender = () => {
  const location = useLocation();
  const paths = ["/login", "/register", "/seller", "/admin", "/sellerRegister","/sellerIndex","/addProduct"];
  return !paths.includes(location.pathname) ? <Header /> : null;
};

export default App;
