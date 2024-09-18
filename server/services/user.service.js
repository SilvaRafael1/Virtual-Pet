import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
 
const prisma = PrismaClient()

class UserService {
  async findByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })
      return user;
    } catch (error) {
      console.error(error)
    }
  }

  async createUser(user) {
    try {
      const saltRounds = 8;
      const salt = bcrypt.genSaltSync(saltRounds)
      const hashedPassword = await bcrypt.hash(user.password, salt)
      const createdUser = await prisma.user.create({
        ...user,
        password: hashedPassword
      })
      return createdUser;
    } catch (error) {
      console.error(error)
    }
  }
}

export default new UserService();