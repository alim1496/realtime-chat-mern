import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { username, room} = data;
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    const { username, msg, timeCreated, room } = data;
    io.in(room).emit('receive_message', data);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    console.log(`${username} has left ${room}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(4000, () => console.log("Server is running on port 4000"));
