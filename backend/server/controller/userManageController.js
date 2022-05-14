const UserModel = require('../model/userschema');
const cloudinary = require('cloudinary').v2
const config = require('../../config')

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
    secure: true
});

//admin user management
exports.userManagement = async (req, res) => {
    if (req.authVerified.role === 'admin' || req.authVerified.role === 'user') {
        if (req.authVerified.role === 'admin') {
            const user = await UserModel.find({})
            if (user) {
                res.send({ message: "Request successfull", user: user });
            } else {
                res.send('Unauthorize User');
            }
        }
    }else{
        res.status(401).send('Unauthorized Access')
    }
}

//admin user management update request
exports.getUserData = async (req, res) => {
    if (req.authVerified.role === 'admin' || req.authVerified.role === 'user') {
        const data = await UserModel.find({ _id: req.params.id })
        if (data) {
            res.send({ message: "Successful", user: data })
        } else {
            res.send({ message: "Error" })
        }
    }else{
        res.status(401).send('Unauthorized Access')
    }
}

//admin user management get updated
exports.updateUserData = async (req, res) => {
    if (req.authVerified.role === 'admin' || req.authVerified.role === 'user') {
        try {
            const values = {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                userImg: req.file ? req.file.path : ''
            }
            const data = await UserModel.findByIdAndUpdate({ _id: req.params.id }, values)
            if (data) {
                res.send({ message: "User Updated Successfully", user: data })
            } else {
                res.send({ message: "Request failed" })
            }
        } catch (error) {
            res.send({ message: "Bad request", err: error })
            console.log(error)
        }
    }else{
        res.status(401).send('Unauthorized Access')
    }
}

//admin user management update user status
exports.updateUserStatus = async (req, res) => {
        try {
            const data = await UserModel.findById({ _id: req.params.id })
            const email = data.email;
            const isActive = data.isActive;
            if (!data) {
                res.send({ message: "User not found" })
            } else {
                if (data.isActive) {
                    const status = !isActive
                    const user = await UserModel.updateOne({ email: email }, { isActive: status })
                } else {
                    const status = !isActive
                    const user = await UserModel.updateOne({ email: email }, { isActive: status })

                }
            }
            const user = await UserModel.find({})
            res.send({ message: 'user updated successfully', user: user })
        } catch (error) {
            res.send(error)
        }
}

//admin user mangement delete
exports.deleteUserData = async (req, res) => {
        try {
            const data = await UserModel.findByIdAndDelete({ _id: req.params.id })
            const user = await UserModel.find({})
            if (data) {
                res.send({ message: "User Deleted Successfully", user: user })
            } else {
                res.send({ message: "Some error in deleting the data" })
            }
        } catch (error) {
            res.send({ messsage: "Error", error: error })
        }
}