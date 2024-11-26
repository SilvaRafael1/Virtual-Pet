import express from "express"
import paymentController from "../controllers/payment.controller.js"

const paymentRouter = express.Router()

paymentRouter.post("/create-payment-intent", paymentController.createPayment)

export default paymentRouter;