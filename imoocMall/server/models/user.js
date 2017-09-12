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
        "prodcutPrice": Number,
        "prodcutImg": String,
        "checked": Boolean,
        "productNum": Number
    }],
    "addressList": Array
});

module.exports = mongoose.model('User', userSchema);