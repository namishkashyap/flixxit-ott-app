import { Router } from "express";
import { addMovieLista, getMovieLiked, login, logout, registerUser, removeMovieFromList } from "../controlers/user.controller.js";


const router = Router()

// Adding reoute and setting wich type of request it will handle
router.route("/signup").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
// router.route("/updateuser").put(updatedUser)
router.route("/add").post(addMovieLista)
router.route("/liked/:email").get(getMovieLiked)
router.route("/delete").put(removeMovieFromList)

export default router