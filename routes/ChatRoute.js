import express from "express";
import Chat from "../models/Chat.js";
import { config } from "../config.js";
import { getToken } from "../utils/Auth.js";

const ChatRoute = express.Router();

ChatRoute.get("/:room", async (req, res) => {
    const startTime = req.query.start !== "" ? req.query.start : Date.now();

    const chats = await Chat
                            .find({ "room": req.params.room, "timecreated": { $lt: startTime } })
                            .limit(10)
                            .populate("sender", { "username": 1 })
                            .sort("-timecreated")
                            .exec();
                            
    const lastTime = chats && chats.length > 0 ? chats[chats.length - 1]["timecreated"] : "";

    if(chats) {
        res.status(200).json({ "message": "Rooms found successfully", "result": chats, "lastTime": lastTime });
    } else {
        res.status(500).json({ "message": "Something went wrong" });
    }
});

ChatRoute.post("/", (req, res) => {
    new Chat(req.body).save()
        .then(chat => res.status(201).json({ "message": "Chat added successfully" }))
        .catch(err => res.status(500).json({ "message": `Could not create room ${err}` }));
});

export default ChatRoute;
