import app from "./src/app.js"
import http from "http"
import 'dotenv/config'
import connectDB from "./src/db/db.js";
import config from "./src/config/config.js";
const port = config.PORT;
const server = http.createServer(app);

connectDB()

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})