import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserService from "./user.service";

const secret = "VirtualPetSecret"

class AuthService {
  async login(email, password) {
    try {
      const findUser = UserService.findByEmail(email)
      if (!findUser) {
        return res.status(404).json({ message: "Usuário ou senha inválida" })
      }

      const validPassword = await bcrypt.compare(password, findUser.password);
      if (!validPassword) {
        return res.status(404).json({ message: "Usuário ou senha inválida" })
      }

      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: "2h"
      })

      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new AuthService();