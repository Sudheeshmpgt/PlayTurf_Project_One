const UserModel = require('../model/userschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId


//user signup
exports.registration = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.send({ message: "User already exists" });
        } else {
            const hashedPw = await bcrypt.hash(password, 12);
            const registerUser = new UserModel({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPw
            });
            const user = await registerUser.save();
            res.send({ message: "User Registered Successfully", user: user });
        }
    } catch (error) {
        res.send(error);
    }
}

//user signin
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email })
        const isMatch = await bcrypt.compare(password, user.password);
        if (user) {
            if (isMatch) {
                const token = await user.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expiresIn: '1h',
                    httpOnly: true
                });
                res.send({ message: "Login Successfull", user: user, token: token })
            } else {
                res.send({ message: "Invalid login details" })
            }
        }
        else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        res.send({ message: "Invalid Credentials", err: error })
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
       
        const {email, password } = req.body
        const hashedPw = await bcrypt.hash(password, 12)
        const filter = {
            email:email
        }  
        const values = {
            password: hashedPw
        }
        const data = await UserModel.findOneAndUpdate(filter,values)
        if(data.length == 0){
            res.send({message:'Please try again'})
        }else{
            res.send({message:'Password updated successfully'})
        }
    } catch (error) {
        res.send(error)
    }
} 

//user Booking check
exports.checkBooking = async (req, res) => {
    try {

        const { centerId, date, startTime } = req.query
        const prevBooking = await BookingModel.find({ centerId: ObjectId(centerId), date: date, startTime: startTime });
        if (prevBooking.length > 0) {
            res.send({ error: "The slot is already booked" })
        } else {
            res.send({ message: "Success" })
        }
    } catch (error) {
        res.send(error)
    }
}
