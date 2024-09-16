import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const app = express()

// CORS
app.use(cors())

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const prisma = new PrismaClient()
app.get("/", async (req, res) => {
  const users = await prisma.user.findMany()
  const pets = await prisma.pet.findMany()

  res.status(200).json({ users, pets })
})

app.listen(3000, () => {
  console.log(`Server está rodando na porta 3000...`)
})