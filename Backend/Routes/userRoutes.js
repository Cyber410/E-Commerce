const express=require("express");
const router=express.Router();
const userCtrl=require("../Controllers/userController");
const auth=require("../Middleware/auth");

//user
router.post("/register",userCtrl.register);
router.post("/registerSeller",userCtrl.sellerRegister);
router.post("/userLogin",userCtrl.userLogin);
router.post("/adminLogin",userCtrl.adminLogin);
router.post("/sellerLogin",userCtrl.sellerLogin);
router.post("/logout",userCtrl.logout);
router.get("/userProfile",userCtrl.userProfile);
//user

module.exports=router;