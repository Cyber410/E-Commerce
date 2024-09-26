const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
       required:true
    },
    phnNo: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'seller', 'admin'],
       default:'user'
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    coopname: {
        type: String
    },
    coopphnNo: {
        type: Number
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    coopAddress: {
        type: String
    },
    empNo: {
        type: Number,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', userSchema);
