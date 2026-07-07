import mongoose from 'mongoose'
import 'dotenv/config'
import config from '../config/config.js';


async function connectDB(){
    await mongoose.connect(config.MONGODB_URI)
    .then(()=>{
        console.log("Connected to DataBase successfully")
    })
    .catch(err=> console.log(err))
}

export default connectDB;