import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user aleardy exist: username and email
    //check for images, check for avatar
    //upload them to cloudinary, check avatar 
    //create user object - create entry in db
    //remove password and refresh token field from response`
    //check for user creation
    //return response
    const { fullName, email, password } = req.body

    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new apiError(409, "User with email already existed")
    }
    const user = await User.create({
        fullName,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshTokken"
    )
    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User register successfully")
    )

})

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new apiError(401, "Email and password is required")
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw new apiError(401, "Invalid email and password")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            throw new apiError(401, "Invalid email and password")
        }
        const tokenData = {
            id: user._id
        }

        const token = await jwt.sign(tokenData, "abkbasd1213312asdsd", { expiresIn: "1h" })
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })

    } catch (error) {
        throw new apiError(401, "Invalid email and password")
    }

})


const logout = asyncHandler(async (req, res) => {
    return res.status(200).cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true }).json({
        message: "User Logout Successfully",
        success: true
    })
})

const updatedUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body

    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new apiError(409, "User with email already existed")
    }
    const user = await User.create({
        fullName,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshTokken"
    )
    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User register successfully")
    )

})


const addMovieLista = asyncHandler(async (req, res) => {
    try {

        const { email, data } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id)
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data]
                    },
                    { new: true }
                );
            } else return res.json({ msg: "Movie already added to the list", likedMovies: [data] })
        } else await User.create({ email, likedMovies: [data] })
        return res.json({ msg: " Movie added successfully", likedMovies: [data] })

    } catch (error) {
        return res.json({ msg: "Error Adding movie" })
    }

})

const getMovieLiked = asyncHandler(async (req, res) => {
    try {

        const { email } = req.params
        const userNew = await User.findOne({ email })
        if (userNew) {
            res.json({ msg: "Success", movies: userNew.likedMovies })
        } else return res.json({ msg: "User not found" })

    } catch (error) {
        return res.json({ msg: "Error Getting movie" })
    }

})

const removeMovieFromList = asyncHandler(async (req, res) => {
    try {
        const { email, movieId } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId)
            if (!movieIndex) res.status(400).send({ msg: "Movie not found" })
            likedMovies.splice(movieIndex, 1)
            await User.findByIdAndUpdate(
                user._id,
                {
                    likedMovies,
                },
                { new: true }
            );
            return res.json({ msg: "Movie deleted", movies: likedMovies })
        }
    } catch (error) {
        return res.json({ msg: "Error Getting movie" })
    }
}
)


export { registerUser, login, logout, updatedUser, addMovieLista, getMovieLiked, removeMovieFromList }