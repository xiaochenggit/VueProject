let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "productPrice": Number,
        "productImg": String,
        "checked": Boolean,
        "productNum": Number
    }],
    "addressList": [{
        "addressId": Number,
        "userName": String,
        "location": String,
        "address": String,
        "phone": Number,
        "tel": String,
        "email": String,
        "checked": Boolean,
        "des": String,
    }]
});

module.exports = mongoose.model('User', userSchema);