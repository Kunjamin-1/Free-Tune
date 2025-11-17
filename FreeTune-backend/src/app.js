import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
const app = express()

app.use(express.json())
app.use(express.static("./public"))
app.use(express.urlencoded({limit:"20kb",extended:true}))
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(cookieParser())


// import routes 

import UserRouter from "./routes/user.route.js"
import musicRouter from "./routes/music.route.js"
import { sendError } from "./middlewares/sendError.middleware.js"

app.use("/api/v1/user",UserRouter)
app.use("/api/v1/music",musicRouter)

app.use(sendError)


export {app}


