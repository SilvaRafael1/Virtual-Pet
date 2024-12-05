import express from "express"
import cors from "cors"
import http from "http"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import productRouter from "./routes/product.routes.js"
import petRouter from "./routes/pet.routes.js"
import paymentRouter from "./routes/payment.routes.js"
import servicesRouter from "./routes/services.routes.js"
import { Server } from "socket.io"
import chatSaveMessage from "./services/chatSaveMessage.js"
import chatGetMessage from "./services/chatGetMessage.js"
import insertAdminUser from "./services/insertAdminUser.js"
import chatRouter from "./routes/chat.routes.js"
import chatJoinVet from "./services/chatJoinVet.js"

const app = express()

// CORS
app.use(cors())

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/user", petRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/services", servicesRouter)
app.use("/api/chat", chatRouter)

// Auto insert admin user
insertAdminUser();

const server = http.createServer(app)

// Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let chatRoom = '';
let allUsers = [];

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    chatGetMessage(room)
      .then(last_50_messages => {
        socket.emit('last_50_messages', last_50_messages);
      })
      .catch(error => {
        console.error("Erro ao obter mensagens:", error);
      });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });

  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data);
    chatSaveMessage(message, username, room, __createdtime__)
  });

  socket.on('join_vet', (data) => {
    const { room } = data;
    chatJoinVet(room);
  })
});

server.listen(3000, () => {
  console.log(`Server está rodando na porta 3000...`)
})