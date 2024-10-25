import express from "express";
import petController from "../controllers/pet.controller.js";

const petRouter = express.Router()

petRouter.get("/:userid/pets/", petController.index)
petRouter.post("/:userid/pets/", petController.create)
petRouter.post("/:userid/pets/:petid", petController.update)
petRouter.delete("/:userid/pets/:petid", petController.delete)

export default petRouter