import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"
import { isValidObjectId, Document } from "mongoose"


type context = RouterContext<"/getUser/:param", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

const getUser = async (ctx: context) => {
    const param = ctx.params.param
    const isValid = isValidObjectId(param);
    const query = isValid ? {
        $or: [
            { email: param },
            { iban: param },
            { phone: param },
            { dni: param },
            {"_id": param}
        ]
    } : {
        $or: [
            { email: param },
            { iban: param },
            { phone: param },
            { dni: param },
        ]
    }
    const user = await User.findOne(query);
    if (!user) throw new HttpError(404, "User not found")
    ctx.response.status = 200
    ctx.response.body = user.toJSON()
}


export default getUser