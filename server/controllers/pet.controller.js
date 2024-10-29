import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {
  async index(req, res) {
    try {
      const { userid } = req.params
      const pets = await prisma.pet.findMany({
        where: {
          ownerId: userid
        }
      })
      return res.json({ pets })
    } catch (error) {
      console.error(error)
    }
  },

  async create(req, res) {
    try {
      const userid = parseInt(req.params.userid)
      const { name, type, race, size } = req.body
      const pet = await prisma.pet.create({
        data: { name, type, race, size, owner: {
          connect: {
            id: userid
          }
        } }
      })
      return res.json({ pet })
    } catch (error) {
      console.error(error)
    }
  },

  async update(req, res) {
    const petid = parseInt(req.params.petid)
    const updatePet = await prisma.pet.update({
      where: {
        id: petid,
      },
      data: req.body
    })
    return res.json({ updatePet })
  },

  async delete(req, res) {
    const petid = parseInt(req.params.petid)
    await prisma.pet.delete({
      where: {
        id: petid
      }
    });
    return res.send("Pet excluído")
  },
}