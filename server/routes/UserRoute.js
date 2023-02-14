import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { config } from "../config.js";
import { getToken } from "../utils/Auth.js";

const UserRoute = express.Router();

UserRoute.post("/register", (req, res) => {
    new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, config.SALT_ROUND)
    })
        .save()
        .then((user) => res.status(201).json({ "success": true, "message": "User registered successfully" }))
        .catch((err) => res.status(500).json({ "success": false, "message": `Could not create user ${err}` }));
});

UserRoute.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        res
            .status(202)
            .cookie("token", JSON.stringify(getToken(user)), { secure: false, httpOnly: true, maxAge: 3600*1000 })
            .json({ "message": "User login successful", "userID": user._id });
    } else {
        res.status(404).json({ "message": "Wrong credentials" });
    }
});

export default UserRoute;
