import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function chatSaveMessage(message, username, room, __createdtime__) {
  try {
    const createdTime = `${__createdtime__}` 
    await prisma.message.create({
      data: {
        message,
        username,
        room,
        createdTime
      }
    })
  } catch (error) {
    console.error(error)
  }
}
