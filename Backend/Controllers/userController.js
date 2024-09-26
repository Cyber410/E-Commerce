const User = require("../Models/Usermodel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser');

require("dotenv").config();


const userCtrl = {

    register: async (req, res) => {
        try {
            const { fname, lname, uname, password, email, phnNo, address } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                return res.status(409).json({ message: 'User already exists' });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: 'Password should be at least 6 characters long' });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                fname, lname, uname, password: passwordHash, email, phnNo, address
            });
            await newUser.save();

            console.log("Registered");
            return res.status(201).json({ message: 'Successfully registered' });
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    sellerRegister: async (req, res) => {
        try {
            console.log(req.body);
            const { fname, lname, uname, coopname, password, email, coopphnNo, coopAddress,role } = req.body;
            const seller = await User.findOne({ email,role });
            if (seller) {
                return res.status(409).json({ message: 'Seller already exists' });
            }

            if (password.length < 6) {
                return res.status(400).json({ message: 'Password should be at least 6 characters long' });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newSeller = new User({
                fname, lname, uname, coopname, password: passwordHash, email, coopphnNo, coopAddress,role
            });
            await newSeller.save();

            console.log("Ready to sell!");
            return res.status(201).json({ message: 'Successfully registered' });
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    adminLogin: async (req, res) => {
        try {
            const { uname, password, empNo } = req.body;
            const Admin = await User.findOne({ uname, empNo, role: "admin" });
            if (!Admin) {
                return res.status(400).json({ message: "Not a user Please Register" });
            }

            const isMatched = await bcrypt.compare(password, Admin.password);
            if (!isMatched) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({ id: Admin._id, role: Admin.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.cookie('Token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'strict',
            });

            res.status(200).json({ message: "Successfully logged in", loggedin:"true" });
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    sellerLogin: async (req, res) => {
        try {
            const { uname, password } = req.body;
            const Seller = await User.findOne({ uname, role: "seller" });
            if (!Seller) {
                return res.status(400).json({ message: "Access Denied" });
            }

            const isMatched = await bcrypt.compare(password, Seller.password);
            if (!isMatched) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({ id: Seller._id, role: Seller.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
                console.log(token)
            res.cookie('Token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'None',
            });
            console.log(res.cookie)

            res.status(200).json({ message: "Successfully logged in",loggedin:"true" ,
                seller:{
                    id: Seller._id,
                uname: Seller.uname,
                fname: Seller.fname,
                lname: Seller.lname,
                email: Seller.email
                }
        });
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    userLogin: async (req, res) => {
        try {
            const { uname, password } = req.body;
            const user = await User.findOne({ uname, role: "user" });
            if (!user) {
                return res.status(400).json({ message: "Access Denied" });
            }

            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.cookie('Token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: 'strict',
            });

            res.status(200).json({ message: "Successfully logged in",loggedin:"true",
                user:{
                id: user._id,
                uname: user.uname,
                fname: user.fname,
                lname: user.lname,
                email: user.email} });
        } catch (error) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    },

    logout:async (req,res)=>{

        try{

            if (req.cookies.Token) {
                res.clearCookie('Token', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                return res.status(200).json({ message: 'User successfully logged out' });
            }

            if(req.cookie.Token){
                res.clearCookie('Token',{
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:"strict"
                });
                return res.status(200).json({message:"Logged out successfully"});
            }

            if(req.cookie.Token){
                res.clearCookie('Token',{
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:"strict"
                });
                return res.status(200).json({message:"Logged out successfully"});
            }
            
            res.status(400).json({ message: 'No active session found' });
        }

       

        catch(error){
            res.status(500).json({ message: `Error: ${error.message}` });
        }

      
    },

    userProfile: async (req, res) => {
        try {
            const { uname, email } = req.query;  // Access query parameters
            console.log(req.query);
            const profile = await User.findOne({ uname, email });
            if (!profile) {
                return res.status(404).json({ message: "No profile Found!" });
            }
    
            console.log(profile);
            res.status(200).json({
                message: "Successfully fetched user Profile",
                profile: {
                    id: profile._id,
                    uname: profile.uname,
                    fname: profile.fname,
                    lname: profile.lname,
                    email: profile.email,
                    cart:profile.cart
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error fetching profile" });
        }
    }
    
    

}

module.exports = userCtrl;
