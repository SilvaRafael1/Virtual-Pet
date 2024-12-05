import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function chatSaveMessage(room) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        room
      },
      take: 50
    });

    const transformDate = messages.map(message => {
      const { createdTime, ...rest } = message;
      return { ...rest, __createdtime__: createdTime };
    });
    
    return transformDate;
  } catch (error) {
    console.error(error)
  }
}
