const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    turfId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'turf',
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

module.exports = OfferModel = mongoose.model('Offer', offerSchema)