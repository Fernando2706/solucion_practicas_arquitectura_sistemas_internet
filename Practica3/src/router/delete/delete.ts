import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"
import { isValidObjectId } from "mongoose"


type context = RouterContext<"/deleteUser/:id", {
    id: string;
} & Record<string | number, string | undefined>, Record<string, any>>

const deleteUser = async (ctx: context) => {
    const param = ctx.params.id
    const isValid = isValidObjectId(param);
    if (!isValid) throw new HttpError(400, "Bad Request")
    const user = await User.deleteOne({
        _id: param
    })
    if (user.deletedCount === 0) throw new HttpError(404, "User not found")

    ctx.response.status = 200
    ctx.response.body = {
        "msg": "User Deleted"
    }
}


export default deleteUser
