import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config.js";
import UserRoute from "./routes/UserRoute.js";
import RoomRoute from "./routes/RoomRoute.js";

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

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log("connected to mongoDB")
);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/rooms", RoomRoute);

server.listen(4000, () => console.log("Server is running on port 4000"));
