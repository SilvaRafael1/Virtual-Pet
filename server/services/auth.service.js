import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserService from "./user.service.js";

const secret = "VirtualPetSecret"

class AuthService {
  async login(email, password) {
    try {
      const findUser = await UserService.findByEmail(email)
      if (!findUser) {
        return res.status(404).json({ message: "Usuário ou senha inválida" })
      }

      const validPassword = await bcrypt.compare(password, findUser.password);
      if (!validPassword) {
        return res.status(404).json({ message: "Usuário ou senha inválida" })
      }

      const token = jwt.sign({ userId: findUser.id }, secret, {
        expiresIn: "2h"
      })

      return token;
    } catch (error) {
      console.error(error)
    }
  }

  async register(email, name, password) {
    try {
      const user = {
        email, name, password
      }
      const createdUser = await UserService.createUser(user)
      return createdUser
    } catch (error) {
      console.error(error)
    }
  }
}

export default new AuthService();