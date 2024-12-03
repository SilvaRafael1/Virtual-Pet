import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {
  async index(req, res) {
    try {
      const services = await prisma.services.findMany()
      return res.json({ services: services })
    } catch (error) {
      console.error(error)
    }
  },

  async findOne(req, res) {
    try {
      const service = await prisma.services.findUnique({
        where: {
          id: req.params.id
        }
      });
      if (!produto) {
        res.send("Produto não encontrado")
      }
      return res.json({ service: service })
    } catch (error) {
      console.error(error)
    }
  },

  async create(req, res) {
    try {
      const { name, desc, price, image } = req.body
      const service = await prisma.services.create({
        data: { name, desc, price, image }
      })
      return res.json({ service })
    } catch (error) {
      console.error(error)
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id)
      const updateService = await prisma.services.update({
        where: { id },
        data: req.body
      })
      return res.json({ updateService: updateService })
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    const id = parseInt(req.params.id)
    await prisma.services.delete({
      where: { id }
    });
    return res.send("Serviço excluído")
  },
}