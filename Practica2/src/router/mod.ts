import { Router } from "oak"
import deleteUser from "./delete/delete.ts"
import getUser from "./get/getUser.ts"
import status from "./get/status.ts"
import addTransaction from "./post/addTransaction.ts"
import addUser from "./post/addUser.ts"


const router = new Router()
router.get("/", status)
    .get("/getUser/:param", getUser)
    .post("/addUser", addUser)
    .delete("/deleteUser/:email", deleteUser)
    .post("/addTransaction", addTransaction)



export default router