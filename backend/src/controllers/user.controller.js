import userModel from "../models/user.models.js";
import userService from "../services/user.services.js"
import { validationResult } from "express-validator";
import blackListModel from "../models/blacklistToken.models.js";

const registerUser=async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname,email,password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({
        message: "User registered successfully",
        token,
        user
    })
}

const loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password')
    ;
    if(!user){
        return res.status(400).json({message: "Invalid email or password"})
    }

    const isMatch = await user.comparePassword(password);
    
    if(!isMatch){
        return res.status(400).json({message: "Invalid email or password"})
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)
    
    res.status(200).json({
        message: "User logged in successfully",
        token,
    })
}

const getUserProfile=(req,res,next)=>{
    res.status(200).json(req.user)
}

const logout=async(req,res,next)=>{
    res.clearCookie('token')
    const token = req.cookies.token || req.header('authorization')?.split(' ')[1];
    if(token){
        await blackListModel.create({token})
    }
    res.status(200).json({message:"User logged out successfully"})
}


export {registerUser, loginUser, getUserProfile,logout};