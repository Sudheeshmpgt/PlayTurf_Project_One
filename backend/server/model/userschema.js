const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const config = require('../../config')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    address:{
        type:String
    },
    userImg:{
        type:String
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
userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id:this._id},config.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}


module.exports = UserModel = mongoose.model('user',userSchema);