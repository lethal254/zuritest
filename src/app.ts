import express, { Express } from "express"
import VendingMachine from "./implementation"
import userRoutes from "./routes/uservendingmachine"
import maintenanceRoutes from "./routes/maintenancevendingmachine"
import { json } from "body-parser"

const app: Express = express()

// This is where we configure the machine we set the coins allowed as an array and products available as an array of objects
export const machine = new VendingMachine(
  [
    { name: "cocacola", productSlot: 1, amountInStock: 0, pricePerItem: 0 },
    { name: "fanta", productSlot: 2, amountInStock: 0, pricePerItem: 0 },
    { name: "mountainDew", productSlot: 3, amountInStock: 0, pricePerItem: 0 },
  ],
  ["20", "10", "5", "25"]
)

app.use(json())
app.use("/uservm", userRoutes)
app.use("/maintenancevm", maintenanceRoutes)

app.listen(3000, () => {
  console.log("App is listening on port 3000")
})
