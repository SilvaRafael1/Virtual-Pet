import express from "express";
import productController from "../controllers/product.controller.js";

const productRouter = express.Router()

productRouter.get("/", productController.index)
productRouter.get("/:id", productController.findOne)
productRouter.post("/", productController.create)
productRouter.post("/:id", productController.update)
productRouter.delete("/:id", productController.delete)

export default productRouter