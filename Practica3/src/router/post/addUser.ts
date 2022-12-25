import { RouterContext } from "oak";
import { hashPassword } from "../../lib/bcrypt.ts";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"

type context = RouterContext<"/addUser", Record<string | number, string | undefined>, Record<string, any>>

interface IBody {
    email: string,
    password: string,
    name:string,
}

const addUser = async (ctx: context) => {
    if (!ctx.request.hasBody) {
        throw new HttpError(400, "You must set a body")
    }
    const body: IBody = await ctx.request.body({"type":"json"}).value

    const hashedPassword = await hashPassword(body.password)

    const user = new User({
        email: body.email,
        name: body.name,
        password: hashedPassword
    })

    await user.save()
    ctx.response.status = 200
    ctx.response.body = {
        "msg": "User added",
        "usr": user.toJSON()
    }

}


export default addUser