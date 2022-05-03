const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    isPaid:Boolean,
    amount:Number,
    razorpay:{
        orderId:String,
        paymentId:String,
        signature:String
    }
})

module.exports = OrderModel = mongoose.model('Order', orderSchema);