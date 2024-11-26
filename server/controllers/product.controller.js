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
    try {
      const { name, desc, price, image } = req.body
      const produto = await prisma.produto.create({
        data: { name, desc, price, image }
      })
      return res.json({ produto })
    } catch (error) {
      console.error(error)
    }
  },

  async update(req, res) {
    try {
      const id = parseInt(req.params.id)
      const updateProduto = await prisma.produto.update({
        where: { id },
        data: req.body
      })
      return res.json({ updateProduto })
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    const id = parseInt(req.params.id)
    await prisma.produto.delete({
      where: { id }
    });
    return res.send("Produto excluído")
  },
}