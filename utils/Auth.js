import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const getToken = (user) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, config.JWT_SERVER_SECRET, { expiresIn: "1h" });
};
