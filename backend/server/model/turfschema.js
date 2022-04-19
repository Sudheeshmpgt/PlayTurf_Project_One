const mongoose = require('mongoose')
const CategoryModel = require('./categoryschema')

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
    },
    categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    price:{
        type:String,
        required:true
    }
})



module.exports = TurfModel = mongoose.model('turf',turfSchema);