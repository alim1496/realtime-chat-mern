import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config.js";
import UserRoute from "./routes/UserRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import ChatRoute from "./routes/ChatRoute.js";
import { CHAT_BOT } from "./utils/Constants.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();



const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const users = new Map();


io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    if(!users.get(room)) users.set(room, [username]);
    else users.get(room).push(username);
    io.in(room).emit("new_user", { users: users.get(room) });
    io.in(room).emit("receive_message", { message: `${username} has joined the room`, timeCreated: Date.now(), sender: { username: CHAT_BOT } });
  });

  socket.on("send_message", (data) => {
    const { username, msg, timeCreated, room } = data;
    const _data = { message: msg, timecreated: timeCreated, sender: { username }};
    io.in(room).emit('receive_message', _data);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    let _users = users.get(room);
    _users = _users ? _users.filter(u => u !== username) : [];
    users.set(room, _users);
    io.in(room).emit("new_user", { users: _users });
    io.in(room).emit("receive_message", { message: `${username} has left the room`, timeCreated: Date.now(), sender: { username: CHAT_BOT } });
  });
});

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log("connected to mongoDB")
);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/rooms", RoomRoute);
app.use("/api/v1/chats", ChatRoute);

server.listen(4000, () => console.log("Server is running on port 4000"));
