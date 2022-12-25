import { model, Schema } from "mongoose";
import HttpError from "./error.ts";

const AuthorsSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    books: {
        type: Array<string>,
        required: true,
        default: []
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

AuthorsSchema.post("save", handleSave)

export default model("Author", AuthorsSchema)