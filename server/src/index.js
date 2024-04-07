import dotenv from "dotenv"
import connectdb from "./db/dbIndex.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

// checking the PORT is listning or not
connectdb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb connection failed:", err);
    })
