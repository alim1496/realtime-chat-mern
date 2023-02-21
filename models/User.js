import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 32,
        lowercase: true,
        trim: true,
        match: [/^[a-z]+[0-9]*$/, "Enter a valid user name"]
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email"],
        trim: true,
        lowercase: true
    }
}, { timestamps: true });

const User = mongoose.model("User", schema);

export default User;
