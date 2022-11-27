import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"

type context = RouterContext<"/addUser", Record<string | number, string | undefined>, Record<string, any>>

interface IBody {
    email: string,
    dni: string,
    phone:string,
    name:string,
    lastName:string
}

const addUser = async (ctx: context) => {
    if (!ctx.request.hasBody) {
        throw new HttpError(400, "You must set a body")
    }
    const body: IBody = await ctx.request.body({"type":"json"}).value

    const user = new User({
        dni: body.dni,
        email: body.email,
        lastname: body.lastName,
        name: body.name,
        phone: body.phone
    })

    await user.save()
    ctx.response.status = 200
    ctx.response.body = {
        "msg": "User added",
        "usr": user.toJSON()
    }

}


export default addUser