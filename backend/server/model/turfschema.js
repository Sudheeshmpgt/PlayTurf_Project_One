const mongoose = require('mongoose')

const turfSchema = new mongoose.Schema({
    centername:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})



module.exports = TurfModel = mongoose.model('turf',turfSchema);