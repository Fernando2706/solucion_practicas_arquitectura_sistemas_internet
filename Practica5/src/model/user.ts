import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    lang: { type: String, required: true, default: "es" },
    createdAt: { type: Date, default: Date.now },
})

export default model("User", UserSchema)