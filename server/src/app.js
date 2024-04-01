import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
app.use(cors({
    origin: "http://localhost:8000",
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