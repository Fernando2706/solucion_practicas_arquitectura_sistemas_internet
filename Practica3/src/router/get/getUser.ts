import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"
import { isValidObjectId } from "mongoose"


type context = RouterContext<"/getUser/:param", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

const getUser = async (ctx: context) => {
    const param = ctx.params.param
    const isValid = isValidObjectId(param);
    if(!isValid) throw new HttpError(400, "Bad Reques")
    const user = await User.findOne({
        _id: param
    });
    if (!user) throw new HttpError(404, "User not found")
    ctx.response.status = 200
    ctx.response.body = user.toJSON()
}


export default getUser