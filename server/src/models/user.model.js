import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

// Adding user Schema. This is data model what data of the we'll add in the database 
const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    likedMovies: Array,
},
    {
        timestamps: true
    }
)

// Mongoose Hook to encrypt the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Checking password is correct and returning
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)