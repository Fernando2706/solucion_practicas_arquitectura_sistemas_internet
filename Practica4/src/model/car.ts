import { model, Schema } from "mongoose";

const CarSchema = new Schema({
    plate: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
})

export default model("Car", CarSchema)