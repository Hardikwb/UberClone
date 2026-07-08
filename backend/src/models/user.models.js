import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name should be of 3 character long"]
        },
        lastname:{
            type:String,
        }
    },
        email:{
            type:String,
            required:true,
            lowercase: true,
        },
        password:{
            type:String,
            required:true,
            minlength:[6,"Password should be of length 6"],
            select:false,
        },
        socketId:{
            type:String,
        }
})

// If it needs this keyword →  method.
// If it does NOT need this keyword → static.



// there is issue with aroow function because of this keyword.
//  This keyword is used to access the current user document and generate a token for that user. If we use arrow function, it will not have its own this and it will refer to the global object, which is not what we want. We want to refer to the current user document, so we need to use regular function syntax.
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, config.JWT_SECRET,{expiresIn: '24h'})
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}

const userModel = mongoose.model("user",userSchema)

export default userModel;

// When a user signs up, you don't have a "User" object in your database yet.
//  You just have a raw string from req.body.password. You use a Static because
//  it doesn't need to know about any existing user—it just transforms data
