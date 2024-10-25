import express from "express";
import petController from "../controllers/pet.controller.js";

const petRouter = express.Router()

petRouter.get("/", petController.index)
petRouter.post("/", petController.create)
petRouter.post("/:petid", petController.update)
petRouter.delete("/:petid", petController.delete)

export default petRouter