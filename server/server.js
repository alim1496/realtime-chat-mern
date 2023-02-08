import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with Socket id ${socket.id}`);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(4000, () => "Server is running on port 4000");
