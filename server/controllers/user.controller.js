import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {
  async getUserById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const user = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          pets: true
        }
      })

      if (!user) 
        return res.json("User not found")
      
      return res.json({ user: user })
    } catch (error) {
      console.error(error)
    }
  },

  async updateUser(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { data } = req.body
      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          data
        }
      })

      if (!updatedUser) 
        return res.json("User not found")
      
      return res.json({ user: updatedUser })
    } catch (error) {
      console.error(error)
    }
  }
}