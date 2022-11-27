import { model, Schema } from "mongoose";
import HttpError from "./error.ts";

const TransactionSchema = new Schema({
    idSender: {
        type: String,
        required:true
    },
    idReciber: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: (v: number) => v > 0,
            message: "Amount must be greater than 0"
        }
    },
    createdAt: { type: Date, default: Date.now },
})
const handleSave = (error: any, _: any, next: any) => {
    if (error) {
        next(new HttpError(400, error.message))
    } else {
        next()
    }
}

TransactionSchema.post("save", handleSave)

export default model("Transaction", TransactionSchema)