import { Router } from "express"
import { buyProduct, getProducts } from "../controllers/uservendingmachine"
const router = Router()

router.post("/buyProduct", buyProduct)
router.get("/products", getProducts)

export default router
