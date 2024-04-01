import { Router } from "express";
import { addMovieLista, getMovieLiked, login, logout, registerUser, removeMovieFromList, updatedUser } from "../controlers/user.controller.js";


const router = Router()

router.route("/signup").post(registerUser)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/updateuser").put(updatedUser)
router.route("/add").post(addMovieLista)
router.route("/liked/:email").get(getMovieLiked)
router.route("/delete").put(removeMovieFromList)

export default router