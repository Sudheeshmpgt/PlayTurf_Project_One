const AdminModel = require('../model/adminschema');

//admin login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email != '' || password != '') {
            const admin = await AdminModel.findOne({ email: email })
            if (admin && (password == admin.password)) {
                const token = await admin.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expiresIn: '1h',
                    httpOnly: true
                });
                res.send({ message: "Login Successfull", admin: admin, token: token })
            }
            else {
                res.send({ message: "Inavalid Admin details" });
            }
        } else {
            res.send({ message: "Please Enter Email and Password" });
        }

    } catch (error) {
        res.send({ message: "Bad Request", err: error });
    }
}