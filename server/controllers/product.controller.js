import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {
  async index(req, res) {
    try {
      const products = await prisma.produto.findMany()
      return res.json({ products: products })
    } catch (error) {
      console.error(error)
    }
  },

  async findOne(req, res) {
    try {
      const produto = await prisma.produto.findUnique({
        where: {
          id: req.params.id
        }
      });
      if (!produto) {
        res.send("Produto não encontrado")
      }
      return res.json({ produto: produto })
    } catch (error) {
      console.error(error)
    }
  },

  async create(req, res) {
    const { name, desc, price } = req.body
    const produto = await prisma.produto.create({
      data: { name, desc, price }
    })
    return res.json({ produto })
  },

  async update(req, res) {
    const updateProduto = await prisma.produto.update({
      where: {
        id: req.params.id
      },
      data: req.body
    })
    return res.json({ updateProduto })
  },

  async delete(req, res) {
    await prisma.produto.delete({
      where: {
        id: req.params.id
      }
    });
    return res.send("Produto excluído")
  },
}