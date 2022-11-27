import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"


type context = RouterContext<"/deleteUser/:email", {
    email: string;
} & Record<string | number, string | undefined>, Record<string, any>>

const deleteUser = async (ctx: context) => {
    const param = ctx.params.email
    const user = await User.deleteOne({
        email: param
    })
    if (user.deletedCount === 0) throw new HttpError(404, "User not found")

    ctx.response.status = 200
    ctx.response.body = {
        "msg": "User Deleted"
    }
}


export default deleteUser