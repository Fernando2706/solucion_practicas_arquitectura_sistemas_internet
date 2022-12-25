import { Router } from "oak"
import deleteUser from "./delete/delete.ts"
import getBooks from "./get/getBooks.ts"
import getUser from "./get/getUser.ts"
import status from "./get/status.ts"
import addAuthor from "./post/addAuthor.ts"
import addBook from "./post/addBook.ts"
import addUser from "./post/addUser.ts"
import updateCart from "./put/updateCart.ts"


const router = new Router()
router.get("/", status)
    .get("/getUser/:param", getUser)
    .post("/addUser", addUser)
    .delete("/deleteUser/:id", deleteUser)
    .post("/addAuthor", addAuthor)
    .post("/addBook", addBook)
    .put("/updateCart", updateCart)
    .get("/getBooks", getBooks)

export default router