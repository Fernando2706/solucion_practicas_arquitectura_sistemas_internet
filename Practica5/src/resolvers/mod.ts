import User from "../model/user.ts"
import Message from "../model/message.ts"
import { comparePassword, hashPassword } from "../lib/bcrypt.ts"
import { createJWT, verifyJWT } from "../lib/jwt.ts"

interface Context {
    auth:string
    lang:string
}

interface ArgsUser {
    username: string
    password: string
}

interface ArgsSendMessage {
    received: string
    message: string
}

interface ArgsGetMessage {
    page: number
    perPage: number
}

const resolvers = {
    Query: {
        login: async (_: any, args: ArgsUser, ctx: Context) => {
            const user = await User.findOne({username: args.username})
            if (!user) throw new Error("User not found")
            if (!comparePassword(user.password, args.password)) throw new Error("Incorrect user or pass")
            if (!Deno.env.get("SECRET")) throw new Error("Internal Server Error, code:1")
            const jwt = await createJWT({ id: user.id }, Deno.env.get("SECRET") || "")
            return jwt
        },
        getMessages: async (_: any, args: ArgsGetMessage) => {
            if (args.page < 0 ) throw new Error("Bad page")
            if (args.perPage < 10 || args.perPage > 200) throw new Error("Bad perPage")
            const messages = await Message.find().limit(args.perPage).skip(args.page * args.perPage)

            return messages
        }
    },
    Mutation: {
        createUser: async (_:any, args: ArgsUser, ctx: Context) => {
            const password = await hashPassword(args.password)
            const user = new User({
                lang: ctx.lang,
                password: password,
                username: args.username
            })
            await user.save()
            return user.toObject()
        },
        deleteUser: async (_: any, __: any, ctx: Context) => {
            if (ctx.auth == "") throw new Error("403 Not auth")
            if (!Deno.env.get("SECRET")) throw new Error("Internal Server Error, code:1")
            const { id } = await verifyJWT(ctx.auth, Deno.env.get("SECRET") || "")
            const user = await User.findByIdAndDelete(id)
            return user
        },
        sendMessage: async (_: any, args: ArgsSendMessage, ctx: Context) => {
            if (ctx.auth == "") throw new Error("403 Not auth")
            if (!Deno.env.get("SECRET")) throw new Error("Internal Server Error, code:1")
            const { id } = await verifyJWT(ctx.auth, Deno.env.get("SECRET") || "")
            const user = await User.findById(id)
            const received = await User.findById(args.received)
            if (!user) throw new Error("User not found")
            if (!received) throw new Error("Received not found")
            if (user.lang != ctx.lang) throw new Error("Bad headers")
            const message = new Message({
                message: args.message,
                received: args.received,
                sender: id
            })
            await message.save()
            return message.toJSON()
        }
    },
    User: {
        id: (obj) => {
    return obj._id.toString()
}
    }
    
}

export default resolvers