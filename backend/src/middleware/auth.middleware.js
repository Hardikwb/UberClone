import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import "dotenv/config";
import blackLisTokenModel from "../models/blacklistToken.models.js";
import captainModel from "../models/captain.models.js";
import config from "../config/config.js";

const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.header('authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized - No token provided"});
    }

    const isBlackListed = await blackLisTokenModel.findOne({token});
     
    if(isBlackListed){
        return res.status(401).json({message: "Unauthorized - Token is blacklisted"})
    }

    try{
        const decoded = jwt.verify(token,config.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user=user
        return next();
    }catch(error){
        res.status(401).json({message:"Unauthorized - Invalid token"})
    }
}

const authCaptain = async (req, res, next) => {
    const captainToken = req.cookies.captainToken || req.headers.authorization?.split(' ')[ 1 ];


    if (!captainToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blackLisTokenModel.findOne({ token: captainToken });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(captainToken, config.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}



export {authUser,authCaptain};