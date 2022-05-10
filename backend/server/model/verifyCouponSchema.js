const mongoose = require('mongoose')

const verifyCouponSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    couponId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Coupon',
        required:true
    }
})

module.exports = VerifyCouponModel = mongoose.model('verifyCoupon', verifyCouponSchema)