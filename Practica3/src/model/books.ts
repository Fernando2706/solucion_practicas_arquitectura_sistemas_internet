import { model, Schema } from "mongoose";
import HttpError from "./error.ts";
import { v4 } from "uuid"

const BooksSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true,
        validate: {
            validator: (v: number) => v > 0,
            message: "Page must be greater than 0"
        }
    },
    createdAt: { type: Date, default: Date.now },
    ISBN: {
        type: String,
        unique: true,
        default: crypto.randomUUID(),
        validate: {
            validator: (v: string) => v4.validate(v),
            message: "Page must be greater than 0"
        }
    }
})
const handleSave = (error: any, _: any, next: any) => {
    if (error) {
        next(new HttpError(400, error.message))
    } else {
        next()
    }
}

BooksSchema.post("save", handleSave)

export default model("Books", BooksSchema)