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
       type:Date,
       required:true
    },
    startTime:{
        type: Date,
        required:true
    },
    endTime:{
        type: Date,
        required:true
    },
    cancelStatus:{
        type:Boolean,
        default:false
    }
})  



module.exports = BookingModel = mongoose.model('Booking',bookingSchema);