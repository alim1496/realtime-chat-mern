import dotenv from "dotenv";
dotenv.config();

export const config = {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SERVER_SECRET: process.env.JWT_SERVER_SECRET,
    SALT_ROUND: 10,
    PORT: process.env.PORT || 4000
};
