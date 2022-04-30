const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    centerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'turf',
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true 
    },
    date:{
       type:String,
       required:true
    },
    startTime:{
        type: String,
        required:true
    },
    endTime:{
        type: String,
        required:true
    },
    cancelStatus:{
        type:Boolean,
        default:false
    }
})  



module.exports = BookingModel = mongoose.model('Booking',bookingSchema);