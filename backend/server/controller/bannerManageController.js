const BannerModel = require('../model/bannerschema');
const cloudinary = require('cloudinary').v2
const config = require('../../config')

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
    secure: true
});


//admin banner management
exports.bannerManagement = async (req, res) => {
    try {
        const banner = await BannerModel.find({})
        if (banner) {
            res.send({ message: "Request successfull", banner: banner });
        } else {
            res.send('Unauthorize Access');
        }
    } catch (error) {
        res.send({ message: "Bad request", error: error })
    }
}

//admin banner management add banner
exports.addBanner = async (req, res) => {
    try {
        const { description } = req.body;
        const url = req.file.path
        if (url) {
            const newBanner = new BannerModel({
                bannerImage: url,
                description: description
            });
            const banner = await newBanner.save();
            res.send({ message: "Banner details added Successfully", banner: banner });
        } else {
            res.send({ error: "Invalid credentials" })
        }
    } catch (error) {
        res.send({ message: "Invalid details", error: error })
        console.log(error)
    }
}

//admin banner management update request
exports.getBannerData = async (req, res) => {
    try {
        const data = await BannerModel.find({ _id: req.params.id })
        if (data) {
            res.send({ message: "Successful", banner: data })
        } else {
            res.send({ message: "Error" })
        }
    } catch (error) {
        console.log(error)
    }

}

//admin banner management get updated
exports.updateBannerData = async (req, res) => {
    try {
        const values = {
            description: req.body.description,
            bannerImage: req.file && req.file.path
        }
        const data = await BannerModel.findByIdAndUpdate({ _id: req.params.id }, values)
        if (data) {
            res.send({ message: "Banner details Updated Successfully", banner: data })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin banner mangement delete
exports.deleteBannerData = async (req, res) => {
    try {
        const data = await BannerModel.findByIdAndDelete({ _id: req.params.id })
        const banner = await BannerModel.find({})
        if (data) {
            res.send({ message: "Deleted Successfully", banner: banner })
        } else {
            res.send({ message: "Some error in deleting the data" })
        }
    } catch (error) {
        res.send({ messsage: "Error", error: error })
    }
}
