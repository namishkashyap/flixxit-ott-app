import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// import { ORIGIN_URI } from "./constants.js"


const app = express()
// app.use(cors({
//     origin: ["https://flixxit-frontend-beta.vercel.app"],
//     methods: ["POST", "GET", "PUT"],
//     credentials: true
// }))

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials" : "true");
    res.header("Access-Control-Allow-Methods" : "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers" : "Origin, Content-Type, Accept");
    });

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.get("/test", (req, res) => {
    res.send("Hello world")
})



// routes import
import userRouter from "./routes/user.routes.js"


// route declaration
app.use("/user", userRouter)

export { app }
