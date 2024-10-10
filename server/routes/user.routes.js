import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/:id", userController.getUserById)
userRouter.post("/:id", userController.updateUser)

export default userRouter