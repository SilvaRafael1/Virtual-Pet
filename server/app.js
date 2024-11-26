import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import productRouter from "./routes/product.routes.js"
import petRouter from "./routes/pet.routes.js"
import paymentRouter from "./routes/payment.routes.js"

const app = express()

// CORS
app.use(cors())

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/user", petRouter)
app.use("/api/payment", paymentRouter)

app.listen(3000, () => {
  console.log(`Server está rodando na porta 3000...`)
})