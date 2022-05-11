const TurfModel = require('../model/turfschema');
const cloudinary = require('cloudinary').v2
const config = require('../../config')

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
    secure: true
});

//admin turf management 
exports.turfManagement = async (req, res) => {
    try {
        const turf = await TurfModel.find({})
        if (turf) {
            res.send({ message: "Request successfull", turf: turf });
        } else {
            res.send('Unauthorize Access');
        }
    } catch (error) {
        res.send('error');
    }
}

//admin turf management add new turf
exports.addTurf = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const { centername, phone, location, category, price } = req.body;

            const urls = [];
            const files = req.files;
            for (const file of files) {
                const { path } = file
                urls.push(path)
            }

            const turf = await TurfModel.findOne({ centername: centername });
            if (turf) {
                res.send({ message: "Turf already exists" });
            } else {
                const addNewTurf = new TurfModel({
                    centername: req.body.centername,
                    phone: req.body.phone,
                    location: req.body.location,
                    category: req.body.category,
                    price: req.body.price,
                    turfPictures: urls
                });
                const turf = await addNewTurf.save();

                res.send({ message: "Turf details added Successfully", turf: turf });
            }
        } catch (error) {
            res.send(error);
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

//admin turf management update request
exports.getTurfData = async (req, res) => {
    if (req.authVerified.role === 'admin' || req.authVerified.role === 'user') {
        const data = await TurfModel.find({ _id: req.params.id })
        if (data) {
            res.send({ message: "Successful", turf: data })
        } else {
            res.send({ message: "Error" })
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

//admin turf management get updated
exports.updateTurfData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const values = {
                centername: req.body.centername,
                phone: req.body.phone,
                location: req.body.location,
                category: req.body.category,
                price: req.body.price,
                turfPictures: req.file && req.file.path
            }
            const data = await TurfModel.findByIdAndUpdate({ _id: req.params.id }, values)
            if (data) {
                res.send({ message: "Turf details Updated Successfully", turf: data })
            } else {
                res.send({ message: "Request failed" })
            }
        } catch (error) {
            res.send({ message: "Bad request", err: error })
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

//admin turf mangement delete
exports.deleteTurfData = async (req, res) => {
    if (req.authVerified.role === 'admin') {
        try {
            const data = await TurfModel.findByIdAndDelete({ _id: req.params.id })
            const turf = await TurfModel.find({})
            if (data) {
                res.send({ message: "Deleted Successfully", turf: turf })
            } else {
                res.send({ message: "Some error in deleting the data" })
            }
        } catch (error) {
            res.send({ messsage: "Error", error: error })
        }
    } else {
        res.status(401).send('Unauthorized Access')
    }
}

