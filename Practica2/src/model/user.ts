import { reset } from "https://deno.land/std@0.152.0/fmt/colors.ts";
import { model, Schema } from "mongoose";
import { email } from "validation";
import HttpError from "./error.ts";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    dni: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (v: string) => {
                const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
                return nifRegex.test(v)
            },
            message: "DNI not valid"
        }
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
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v: string) => v.length === 9,
            message: "Phone not valid"
        }
    },
    iban:{
        type: String,
        unique: true,
        default: generateIban()
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

function generateIban() {
    const accountNumber = Math.random() * 1000000000000
    return "ES" + accountNumber;
}

UserSchema.post("save", handleSave)

export default model("User", UserSchema)