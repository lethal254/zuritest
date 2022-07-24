import { Router } from "express"
import { Request, Response } from "express"
import {
  getInventory,
  setChange,
  setPrices,
  setQuantity,
} from "../controllers/maintenancevendingmachine"
const router = Router()

router.post("/setQuantity", setQuantity)
router.post("/setPrices", setPrices)
router.post("/setChange", setChange)
router.get("/inventory", getInventory)

export default router
