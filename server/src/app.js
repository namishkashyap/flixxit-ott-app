import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


//adding express as app
const app = express()

// Adding the CROS middleware
app.use(cors({
    origin: ["https://clever-marshmallow-a0b627.netlify.app"],
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
