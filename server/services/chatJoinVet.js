import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function chatJoinVet(room) {
  try {
    while(room != undefined) {
      await prisma.message.updateMany({
        where: { room },
        data: { vet: true }
      })
      return
    }
  } catch (error) {
    console.error(error)
  }
}