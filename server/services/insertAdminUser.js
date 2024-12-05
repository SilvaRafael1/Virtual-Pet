import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export default async function insertAdminUser() {
  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: "admin"
      }
    })

    if (exist) return console.log("Usuário admin já cadastrado.")
    
    const saltRounds = 8;
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = await bcrypt.hash("admin", salt)
    const createdUser = await prisma.user.create({
      data: {
        email: "admin",
        name: "Admin",
        password: hashedPassword,
        role: "Admin"
      }
    })
    console.log("Usuário admin inserido com sucesso!");
  } catch (error) {
    console.error(error)
  }
}