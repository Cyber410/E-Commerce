const jwt=require("jsonwebtoken");
require("dotenv").config();

const auth=(req,res,next)=>{
   
    console.log(req.cookies)
    const token = req.cookies.Token; 

    if(!token){
       return res.status(400).json({message:"Access Denied!"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(403).json({ message: "Invalid token" });
    }
}

module.exports=auth;