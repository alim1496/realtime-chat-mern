import express from "express";
import User from "../models/User.js";
import Room from "../models/Room.js";
import { config } from "../config.js";
import { getToken } from "../utils/Auth.js";

const RoomRoute = express.Router();

RoomRoute.get("/", async (req, res) => {
    const rooms = await Room.find({}).populate("createdBy", { "username": 1 }).exec();

    if(rooms) {
        res.status(200).json({ "message": "Rooms found successfully", "result": rooms });
    } else {
        res.status(500).json({ "message": "Something went wrong" });
    }
});

RoomRoute.get("/:id", async (req, res) => {
    const room = await Room.findById(req.params.id);

    if(room) {
        res.status(200).json({ "message": "Rooms found successfully", "result": room });
    } else {
        res.status(500).json({ "message": "Something went wrong" });
    }
});

RoomRoute.post("/", (req, res) => {
    new Room(req.body).save()
        .then(room => res.status(201).json({ "success": true, "message": "Room created successfully", "result": room }))
        .catch(err => res.status(500).json({ "success": false, "message": `Could not create room ${err}` }));
});

export default RoomRoute;
