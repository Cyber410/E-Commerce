const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
const express=require("express");
const cookieParser = require('cookie-parser');
const cors=require("cors");
 const path=require('path');


const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

// routes
app.use('/user',require('./Routes/userRoutes'));
app.use('/products',require('./Routes/productRoutes'));


//mongodb connection

const Url= process.env.Mongodb_Url;

mongoose.connect(Url,{
}).then(()=>{
    console.log("Connected to Atlas")
}).catch((err)=>{
    console.log(err);
})