import { RouterContext } from "oak";
import HttpError from "../../model/error.ts";
import Transaction from "../../model/transaction.ts"
import { isValidObjectId } from "mongoose"

type context = RouterContext<"/addTransaction", Record<string | number, string | undefined>, Record<string, any>>

interface IBody {
    idSender: string;
    idReceiber: string;
    amount:number
}

const addTransaction = async (ctx: context) => {
    if (!ctx.request.hasBody) {
        throw new HttpError(400, "You must set a body")
    }
    const body: IBody = await ctx.request.body({ "type": "json" }).value

    if (!isValidObjectId(body.idReceiber) || !isValidObjectId(body.idSender)) throw new HttpError(400, "Bad format ID")

    const transaction = new Transaction({
        idReciber: body.idReceiber,
        idSender: body.idSender,
        amount: body.amount
    })

    await transaction.save()
    ctx.response.status = 200
    ctx.response.body = {
        "msg": "Transaction added",
        "tx": transaction.toJSON()
    }

}


export default addTransaction