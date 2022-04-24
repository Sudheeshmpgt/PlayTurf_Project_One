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
       required:true
    },
    category:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }, 
    offer:{
        type: Number
    },
    turfPictures:[
            {
                type:String,
            }
    ]
})  



module.exports = TurfModel = mongoose.model('turf',turfSchema);