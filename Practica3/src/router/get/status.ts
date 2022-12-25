import { RouterContext} from "oak";


type context = RouterContext<"/", Record<string | number, string | undefined>, Record<string, any>>

const status = (ctx:context) => {
    ctx.response.status = 200
    ctx.response.body = {
        "message": "All services right"
    }
}


export default status