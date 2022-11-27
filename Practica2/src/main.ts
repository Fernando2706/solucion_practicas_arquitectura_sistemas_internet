import {Application} from "oak"
import * as Colors from "colors"
import mongoose from "mongoose"
import { dotEnvConfig } from './deps.ts';
import router from "./router/mod.ts";
import HttpError from "./model/error.ts";

dotEnvConfig({ export: true });


const app = new Application();
if (!Deno.env.get("MONGO_URL") || !Deno.env.get("PORT")) {
    console.error(Colors.red("You must set a url to mongo and a port in the .env file."))
    Deno.exit()
}

try {
    await mongoose.connect(Deno.env.get("MONGO_URL") as string );
} catch (_) {
    console.error(Colors.red("Cannot connect to mongo"))
    Deno.exit()
}

app.use(async (ctx,next)=>{
    try {
        console.info(Colors.blue(`New Request (${ctx.request.method}) at ${Date()} from ${ctx.request.ip}`))
        await next();
    } catch (err) {
        console.error(Colors.red(`Error!: ${err.message}`))
        if (err instanceof HttpError) {
            ctx.response.status = err.status;
        }else {
            ctx.response.status = 500;
        }
        ctx.response.body = { msg: err.message };
    }
})

app.use(router.allowedMethods())
app.use(router.routes())


console.log(`Listening on port:${Deno.env.get("PORT") }`)
await app.listen({ port: Number(Deno.env.get("PORT")), hostname:"127.0.0.1"})