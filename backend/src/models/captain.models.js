import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config.js";

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name should be of 3 character long"]
        },
        lastname:{
            type:String
        }
    },
    email:{
        type:String,
        required:true,
        lowercase: true,
        unique: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,"Password should be of length 6"],  
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,    
        enum:['active','inactive'],
        default:'active'
    },
   vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        vehicleNumber: {
            type: String,
            required: true,
            minlength: [ 3, 'vehicleNumber must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },

    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashedPassword = async function(password) {
   return await bcrypt.hash(password,10)
}



const captainModel = mongoose.model('captain', captainSchema);
export default captainModel;