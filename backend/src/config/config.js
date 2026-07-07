import dotenv from "dotenv"
dotenv.config()

class Config{
    PORT = process.env.PORT
    MONGODB_URI = process.env.MONGODB_URI
    JWT_SECRET = process.env.JWT_SECRET
    GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
    
}
const config = new Config()
export default config