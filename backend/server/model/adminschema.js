const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('../../config')

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

//generating token
adminSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id},config.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}




module.exports = AdminModel = mongoose.model('admins',adminSchema);

// const admins = new AdminModel({email:'admin@gmail.com',password:'admin@123'})
// admins.save().then((m)=>{
//     console.log(m)
// }).catch((e)=>{
//     console.log(e)
// })
