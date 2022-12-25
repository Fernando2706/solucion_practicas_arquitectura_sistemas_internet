import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import Book from "../../model/books.ts"
import { isValidObjectId } from "mongoose"
import { getQuery } from "helpers-oak"

type context = RouterContext<"/getBooks", {
    param: string;
} & Record<string | number, string | undefined>, Record<string, any>>

interface IRequest {
    title?: string
    page?: number
}

const getBooks = async (ctx: context) => {
    const params: IRequest = getQuery(ctx) as any
    const page = params.page || 0
    const title = params.title || ""

    const books = await Book.find({
        title: {
            "$regex": title, "$options": "i"
        }
    })
        .limit(10)
        .skip(10 * page)
        

    ctx.response.status = 200
    ctx.response.body = {
        "books": books
    }

}


export default getBooks