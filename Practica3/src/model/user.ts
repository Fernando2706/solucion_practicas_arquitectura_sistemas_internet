import { model, Schema } from "mongoose";
import { email } from "validation";
import HttpError from "./error.ts";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v: string) => email.valid(v),
            message: "Email not valid"
        }
    },
    password: {
        type: String,
        required: true,
    },
    cart:{
        type: Array<String>,
        default: []
    },
    createdAt: { type: Date, default: Date.now },
})


const handleSave = (error: any, _:any, next: any) => {
    if(error) {
        next(new HttpError(400, error.message))
    } else {
        next()
    }
}

UserSchema.post("save", handleSave)

export default model("User", UserSchema)