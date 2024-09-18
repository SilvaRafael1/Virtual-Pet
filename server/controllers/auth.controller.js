import AuthService from "../services/auth.service"

class AuthController {
  async login(req, res) {
    const { email, password } = req.body
    const token = await AuthService.login(email, password)
    res.status(200).json({ token })
  }
}

export default new AuthController();