import AuthService from "../services/auth.service.js"

class AuthController {
  async login(req, res) {
    const { email, password } = req.body
    const user = await AuthService.login(email, password)
    res.status(200).json({ user })
  }

  async register(req, res) {
    const { email, name, address, password } = req.body
    const createdUser = await AuthService.register(email, name, address, password)
    res.status(201).json({ createdUser })
  }
}

export default new AuthController();