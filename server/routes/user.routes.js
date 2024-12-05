import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/", userController.index)
userRouter.post("/vet/:id", userController.updateToVet)
userRouter.get("/:id", userController.getUserById)
userRouter.post("/:id", userController.updateUser)

export default userRouter