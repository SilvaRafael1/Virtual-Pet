import express from "express";
import servicesController from "../controllers/services.controller.js";

const servicesRouter = express.Router()

servicesRouter.get("/", servicesController.index)
servicesRouter.get("/:id", servicesController.findOne)
servicesRouter.post("/", servicesController.create)
servicesRouter.post("/:id", servicesController.update)
servicesRouter.delete("/:id", servicesController.delete)

export default servicesRouter