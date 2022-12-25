import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import Author from "../../model/author.ts"
import Book from "../../model/books.ts"
import { isValidObjectId } from "mongoose"


type context = RouterContext<"/addBook", Record<string | number, string | undefined>, Record<string, any>>

interface IBody {
    author: string,
    pages: number,
    title: string,
}

const addBook = async (ctx: context) => {
    if (!ctx.request.hasBody) {
        throw new HttpError(400, "You must set a body")
    }
    const body: IBody = await ctx.request.body({ "type": "json" }).value

    if (!isValidObjectId(body.author)) throw new HttpError(400, "Bad param - author")

    const isAuthor = await Author.findById(body.author)

    if (!isAuthor) throw new HttpError(404, "Author not found")

    const book = new Book({
        title: body.title,
        pages: body.pages,
        author: body.author,
        ISBN: crypto.randomUUID()
    })

    await book.save()

    if(!book.id) throw new HttpError(500, "Book not saved")

    const result =  await Author.updateOne({
        _id: isAuthor.id
    }, {
        "$push": {
            books: book.id
        }
    })
    if (result.modifiedCount === 0) throw new HttpError(500, "Author not updated")
    ctx.response.status = 200
    ctx.response.body = {
        "msg": "Book added",
        "usr": book.toJSON()
    }

}


export default addBook