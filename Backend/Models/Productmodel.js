const mongoose=require("mongoose");

const ProductSchema= new mongoose.Schema({

    productId:{
        type:Number,
        required:true,
        unique:true
    },

    title:{
        type:"String",
        required:true,
        trim:true
    },

    image:{
        type:"String",
        required:true
    },

    description:{
        type:"String",
        required:true
    },

    price:{
        type:Number,
        required:true,
        trim:true
    },

    sold:{
        type:Number,
        default:0
    },

    category: {
        type: String,
        ref: 'Category',
        required: true
    },


    stock: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    rating:{
        type:Number,
        default:0,
        max:5,
        min:0
    },

    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        rating: Number,
        date: { type: Date, default: Date.now }
    }],

    brand: {
        type: String
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports=mongoose.model("Product",ProductSchema);