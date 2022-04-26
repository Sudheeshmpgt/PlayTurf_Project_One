const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    bannerImage: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = BannerModel = mongoose.model('Banner', bannerSchema)