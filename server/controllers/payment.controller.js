import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
const prisma = new PrismaClient()

export default {
  async createPayment(req, res) {
    try {
      const { price, payment_method } = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "brl",
        payment_method,
        confirmation_method: "manual",
        confirm: true,
        return_url: "http://localhost:5173/main"
      });
  
      res.send({
        client_secret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message })
      console.log(error)
    }
  }
}