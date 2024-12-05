import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default {
  async waiting(req, res) {
    try {
      const messages = await prisma.message.findMany()
      const processedRooms = new Set();
      const filteredMessages = messages
        .sort((a, b) => a.vet - b.vet)
        .filter((message) => {
          if (!processedRooms.has(message.room)) {
            processedRooms.add(message.room);
            return true;
          }
          return false;
        });
      return res.json({ messages: filteredMessages })
    } catch (error) {
      console.error(error)
    }
  }
}