import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    room: {
        type: ObjectId,
        ref: "Room",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timecreated: {
        type: Date
    }
}, { timestamps: true });

const Chat = mongoose.model("Chat", schema);

export default Chat;
