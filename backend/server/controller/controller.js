const UserModel = require('../model/userschema');
const bcrypt = require('bcrypt');

//home
exports.home = (req, res) => {
    res.send('<h3>server started</h3>');
}

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


