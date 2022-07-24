import { Request, Response } from "express"
import { machine } from "../app"

export const setQuantity = (req: Request, res: Response) => {
  if (req.body.slot) {
    const data = machine.setNumberofProductsAvailable(
      req.body.slot,
      req.body.amount
    )
    if (data.success) {
      res.status(200).send(data)
    } else {
      res.status(500).send("Something went wrong")
    }
  } else {
    res.status(500).send({ error: "You need to provide product details" })
  }
}
export const setPrices = (req: Request, res: Response) => {
  if (req.body.slot) {
    const data = machine.setPrice(req.body.slot, req.body.amount)
    if (data.success) {
      res.status(200).send(data)
    } else {
      res.status(500).send("Something went wrong")
    }
  } else {
    res.status(500).send({ error: "You need to provide product details" })
  }
}
export const setChange = (req: Request, res: Response) => {
  if (req.body.coins) {
    const data = machine.addCoinsToInventory(req.body.coins)
    if (data.success) {
      res.status(200).send(data)
    } else {
      res.status(500).send("Something went wrong")
    }
  } else {
    res.status(500).send({ error: "You need to provide product details" })
  }
}
export const getInventory = (req: Request, res: Response) => {
  const inventory = machine.getInventory
  res.status(200).send(inventory)
}
