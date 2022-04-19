const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    centername:{
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true,
    },
    category:{
        type: String,
        required: true
    }
})

module.exports = CategoryModel = mongoose.model('category', categorySchema)