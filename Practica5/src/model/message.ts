import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
    sender: { type: String, required: true },
    received: { type: String, required: true },
    message: { type: String, required: true, default: "es" },
    createdAt: { type: Date, default: Date.now },
})

export default model("Message", MessageSchema)