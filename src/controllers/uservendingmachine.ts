import { Request, Response } from "express"
import { machine } from "../app"

export const buyProduct = (req: Request, res: Response) => {
  if (req.body.slot) {
    const data: any = machine.buyProduct(req.body.slot, req.body.coins)
    if (data.success) {
      res.status(200).send(data)
    } else if (data) {
      res.status(500).send(data)
    }
    console.log(data)
  } else {
    res.status(500).send({ error: "You need to provide product details" })
  }
}
export const getProducts = (req: Request, res: Response) => {
  const products = machine.getProductsAvailable
  res.status(200).send(products)
}
