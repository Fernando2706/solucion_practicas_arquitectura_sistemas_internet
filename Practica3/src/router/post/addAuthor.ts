import { RouterContext } from "oak";
import { hashPassword } from "../../lib/bcrypt.ts";
import HttpError from "../../model/error.ts";
import Author from "../../model/author.ts"

type context = RouterContext<"/addAuthor", Record<string | number, string | undefined>, Record<string, any>>

interface IBody {
    name: string,
}

const addAuthor = async (ctx: context) => {
    if (!ctx.request.hasBody) {
        throw new HttpError(400, "You must set a body")
    }
    const body: IBody = await ctx.request.body({ "type": "json" }).value
    const author = new Author({
        name: body.name
    })

    await author.save()
    ctx.response.status = 200
    ctx.response.body = {
        "msg": "Author added",
        "usr": author.toJSON()
    }

}


export default addAuthor