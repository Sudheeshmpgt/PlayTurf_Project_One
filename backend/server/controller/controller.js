const UserModel = require('../model/userschema');
const AdminModel = require('../model/adminschema');
const TurfModel = require('../model/turfschema')
const CategoryModel = require('../model/categoryschema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dubmms1ur', 
    api_key: '836684132162993', 
    api_secret: 'U3_4xmtBm9pw88heylhiGP5LNqE',
    secure: true
  });


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
                res.send({ message: "Login Successfull", user: user })
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
                res.send({ message: "Login Successfull", admin: admin })
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

//admin user management
exports.userManagement = async (req, res) => {
    const user = await UserModel.find({})
    if (user) {
        res.send({ message: "Request successfull", user: user });
    } else {
        res.send('Unauthorize User');
    }
}

//admin user management update request
exports.getUserData = async (req, res) => {
    const data = await UserModel.find({ _id: req.params.id })
    if (data) {
        res.send({ message: "Successful", user: data })
    } else {
        res.send({ message: "Error" })
    }
}

//admin user management get updated
exports.updateUserData = async (req, res) => {
    try {
        const data = await UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (data) {
            res.send({ message: "User Updated Successfully", user: data })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin user management update user status
exports.updateUserStatus = async (req,res) =>{
    try {
        const data = await UserModel.findById({ _id: req.params.id })
        const email = data.email;
        const isActive = data.isActive;
        if(!data){
            res.send({message:"User not found"})
        }else{
            if (data.isActive){
                const status=!isActive
                const user = await UserModel.updateOne({email:email},{isActive:status})
            }else{
                const status=!isActive
                const user = await UserModel.updateOne({email:email},{isActive:status})

            }
        }
        const user = await UserModel.find({})
        res.send({message:'user updated successfully',user:user})
    } catch (error) {
        
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
        res.send({messsage:"Error", error:error})
    }
}

//admin turf management 
exports.turfManagement = async (req, res) => {
    const turf = await TurfModel.find({})
    if (turf) {
        res.send({ message: "Request successfull", turf: turf });
    } else {
        res.send('Unauthorize Access');
    }
}

//admin turf management add new turf
exports.addTurf = async (req, res) => {
    try {
        const { centername, phone, location, category, price } = req.body;
        const turf = await TurfModel.findOne({ centername: centername });
        if (turf) {
            res.send({ message: "Turf already exists" });
        } else {
            const addNewTurf = new TurfModel({
                centername: req.body.centername,
                phone: req.body.phone,
                location: req.body.location,
                price: req.body.price
            });
            const turf = await addNewTurf.save();
            await TurfModel.find().populate('categories')
            .then(result=>{
            })
            
            res.send({ message: "Turf deatils added Successfully", turf: turf });
        }
    } catch (error) {
        res.send(error);
    }
}

//admin turf management update request
exports.getTurfData = async (req, res) => {
    const data = await TurfModel.find({ _id: req.params.id })
    if (data) {
        res.send({ message: "Successful", turf: data })
    } else {
        res.send({ message: "Error" })
    }
}

//admin turf management get updated
exports.updateTurfData = async (req, res) => {
    try {
        const data = await TurfModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (data) {
            res.send({ message: "Turf details Updated Successfully", turf: data })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin turf mangement delete
exports.deleteTurfData = async (req, res) => {
    try {
        const data = await TurfModel.findByIdAndDelete({ _id: req.params.id })
        const turf = await TurfModel.find({})
        if (data) {
            res.send({ message: "User Deleted Successfully", turf: turf })
        } else {
            res.send({ message: "Some error in deleting the data" })
        }
    } catch (error) {
        res.send({messsage:"Error", error:error})
    }
}

//admin category management
exports.categoryManagement = async (req, res) =>{
    try {
        const category = await CategoryModel.find({})
        if (category) {
            res.send({ message: "Request successfull", category: category });
        } else {
            res.send('Unauthorize Access');
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin category management add category
exports.addCategory = async (req, res) => {
    try {
        const { centername, location, category } = req.body;
        const turfCategory = await CategoryModel.findOne({ centername: centername });
        if (turfCategory) {
            res.send({ message: "Category already exists" });
        } else {
            const addNewCategory = new CategoryModel({
                centername: req.body.centername,
                location: req.body.location,
                category: req.body.category
            });
            const turfCategory = await addNewCategory.save();
            res.send({ message: "Category deatils added Successfully", turf: turfCategory });
        }
    } catch (error) {
        res.send(error);
    }
}

//admin category management update request
exports.getCategoryData = async (req, res) => {
    const data = await CategoryModel.find({ _id: req.params.id })
    if (data) {
        res.send({ message: "Successful", category: data })
    } else {
        res.send({ message: "Error" })
    }
}

//admin category management get updated
exports.updateCategoryData = async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (data) {
            res.send({ message: "Category details Updated Successfully", category: data })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin category mangement delete
exports.deleteCategoryData = async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndDelete({ _id: req.params.id })
        const category = await CategoryModel.find({})
        if (data) {
            res.send({ message: "Deleted Successfully", category: category })
        } else {
            res.send({ message: "Some error in deleting the data" })
        }
    } catch (error) {
        res.send({messsage:"Error", error:error})
    }
}

