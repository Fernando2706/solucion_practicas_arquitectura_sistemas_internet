import { RouterContext } from "oak";
import { hashPassword } from "../../lib/bcrypt.ts";
import HttpError from "../../model/error.ts";
import User from "../../model/user.ts"
import Book from "../../model/books.ts"
import { isValidObjectId } from "mongoose"

type context = RouterContext<"/updateCart", Record<string | number, string | undefined>, Record<string, any>>

interface IBody {
    id_book: string
    id_user: string
}

const updateCart = async (ctx: context) => {
    if (!ctx.request.hasBody) {
        throw new HttpError(400, "You must set a body")
    }
    const body: IBody = await ctx.request.body({ "type": "json" }).value

    if (!isValidObjectId(body.id_book) || !isValidObjectId(body.id_user)) throw new HttpError(400, "Bad params")

    const book = await Book.findById(body.id_book)
    const user = await User.findById(body.id_user)

    if (!book || !user) throw new HttpError(404, "User or Book not found")

    await user.update({
        "$push": {
            cart: book.id
        }
    })

    ctx.response.status = 200
    ctx.response.body = {
        "msg": "User updated",
    }

}


export default updateCart