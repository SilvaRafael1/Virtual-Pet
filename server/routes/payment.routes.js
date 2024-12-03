import express from "express"
import paymentController from "../controllers/payment.controller.js"

const paymentRouter = express.Router()

paymentRouter.get("/:userid", paymentController.index)
paymentRouter.post("/create-payment-intent", paymentController.createPayment)
paymentRouter.post("/confirm-payment/:userid", paymentController.confirmPayment)

export default paymentRouter;