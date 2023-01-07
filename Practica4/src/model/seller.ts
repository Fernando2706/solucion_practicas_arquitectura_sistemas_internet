import { model, Schema } from "mongoose";

const SellerSchema = new Schema({
    dni: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cars: {
        type: Array<String>,
        default: []
    },
    createdAt: { type: Date, default: Date.now },
})

export default model("Seller", SellerSchema)