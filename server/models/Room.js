import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 50
    },
    cover: {
        type: URL
    },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Room = mongoose.model("Room", schema);

export default Room;
