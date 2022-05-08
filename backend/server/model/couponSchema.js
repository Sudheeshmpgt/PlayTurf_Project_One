const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    couponCode:{
        type:String,
        required:true
    },
    offerPercent:{
        type:Number,
        required:true
    },
    fromDate:{
        type:String,
        required:true
    },
    toDate:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = CouponModel = mongoose.model('Coupon', couponSchema)