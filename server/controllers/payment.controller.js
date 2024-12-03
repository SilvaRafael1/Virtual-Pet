import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
const prisma = new PrismaClient()

export default {
  async index(req, res) {
    try {
      const userId = parseInt(req.params.userid) 
      const vendas = await prisma.venda.findMany({
        where: { userId }
      })
      return res.json({ vendas: vendas })
    } catch (error) {
      console.error(error)
    }
  },

  async createPayment(req, res) {
    try {
      const { price, payment_method } = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "brl",
        payment_method,
        confirmation_method: "manual",
        payment_method_types: ["card"],
      });

      await stripe.paymentIntents.confirm(paymentIntent.id);
  
      res.send({
        client_secret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message })
      console.log(error)
    }
  },

  async confirmPayment(req, res) {
    try {
      const userId = parseInt(req.params.userid)
      const { totalPriceFront, sacola } = req.body

      let sacolaOnlyId = []
      for (let item of sacola) {
        sacolaOnlyId.push({ id: item.id })
      }

      const sale = await prisma.venda.create({
        data: {
          user: {
            connect: {
              id: userId
            }
          },
          totalPrice: parseFloat(totalPriceFront),
          produtos: {
            create: [{
              produto: {
                connect: {
                  id: 1
                }
              }
            }]
          }
        }
      })

      res.status(200).json({ sale: sale })
    } catch (error) {
      res.status(500).send({ error: error.message })
      console.log(error)
    }
  }
}