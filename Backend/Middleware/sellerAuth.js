const User=require("../Models/Usermodel");

const sellerAuth= async (req,res,next)=>{

    try{
        const Admin= await User.findOne({
            _id:req.user._id
        })

        if(Admin && (Admin.role!="seller" || Admin.role!='admin')){
            return res.status(403).json({message:"Access Denied ! Not A Seller or admin"})
        }

        next();


    }

    catch(err){
        res.status(500).json({message:"Internal server error",err})
    }

}

module.exports=sellerAuth;