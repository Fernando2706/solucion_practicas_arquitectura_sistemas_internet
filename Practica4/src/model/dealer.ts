import { model, Schema } from "mongoose";

const DealerSchema = new Schema({
    NIF: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sellers: {
        type: Array<String>,
        default: []
    },
    createdAt: { type: Date, default: Date.now },
})

export default model("Dealer", DealerSchema)