const mongoose = require('mongoose')

const favouritesSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    turfId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'turf',
        required:true
    }
})

module.exports = FavouritesModel = mongoose.model('Favourite', favouritesSchema);