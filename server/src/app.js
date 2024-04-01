import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// import { ORIGIN_URI } from "./constants.js"


const app = express()
app.use(cors({
    origin: ["https://flixxit-frontend-beta.vercel.app/"],
    methods: ["POST", "GET", "PUT"],
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())




// routes import
import userRouter from "./routes/user.routes.js"


// route declaration
app.use("/user", userRouter)

export { app }