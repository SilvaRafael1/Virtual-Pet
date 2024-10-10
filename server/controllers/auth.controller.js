import AuthService from "../services/auth.service.js"

class AuthController {
  async login(req, res) {
    const { email, password } = req.body
    const token = await AuthService.login(email, password)
    res.status(200).json({ token })
  }

  async register(req, res) {
    const { email, name, password } = req.body
    const createdUser = await AuthService.register(email, name, password)
    res.status(201).json({ createdUser })
  }
}

export default new AuthController();