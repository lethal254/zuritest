export default class VendingMachine {
  private change: { [key: string]: number } = {}
  constructor(
    private productsAvailable: {
      name: string
      productSlot: number
      amountInStock: number
      pricePerItem: number
    }[],
    private coinsAccepted: string[]
  ) {
    // We loop through the coins accepted when configuring a vending machine and set them as changes available with defaults of 0
    coinsAccepted.forEach((coin) => {
      this.change[coin] = 0
    })
  }
  public get getInventory() {
    return { change: this.change, productsAvailable: this.productsAvailable }
  }

  public get getProductsAvailable() {
    return { productsAvailable: this.productsAvailable }
  }

  setPrice(slot: number, price: number): { success: boolean } {
    this.productsAvailable.filter(
      ({ productSlot }) => productSlot === slot
    )[0].pricePerItem = price
    return {
      success: true,
    }
  }
  setNumberofProductsAvailable(
    slot: number,
    numberAvailable: number
  ): { success: boolean } {
    this.productsAvailable.filter(
      ({ productSlot }) => productSlot === slot
    )[0].amountInStock = numberAvailable
    return {
      success: true,
    }
  }
  checkProductAvailability(slot: number): { inStock: boolean } {
    const product = this.productsAvailable.filter(
      ({ productSlot }) => productSlot === slot
    )[0]
    if (product.amountInStock > 0) {
      return {
        inStock: true,
      }
    } else {
      return {
        inStock: false,
      }
    }
  }
  checkProvisionOfEnoughMoney(
    slot: number,
    amountProvided: number
  ): { enoughMoneyProvided: boolean; change: number } {
    const product = this.productsAvailable.filter(
      ({ productSlot }) => productSlot === slot
    )[0]
    if (amountProvided >= product.pricePerItem) {
      return {
        enoughMoneyProvided: true,
        change: amountProvided - product.pricePerItem,
      }
    } else {
      return {
        enoughMoneyProvided: false,
        change: 0,
      }
    }
  }
  checkPossibilityToGiveEnoughChange(amountGivenByUser: number): {
    possibleTogiveEnoughChange: boolean
  } {
    const totalCoinsValueInInventory = Object.entries(this.change)
      .map((entry) => +entry[0] * +entry[1])
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    if (totalCoinsValueInInventory - amountGivenByUser > 0) {
      return {
        possibleTogiveEnoughChange: true,
      }
    }
    return {
      possibleTogiveEnoughChange: false,
    }
  }
  buyProduct(slot: number, coins: { [key: string]: number }): {} {
    const totalGivenByUser = Object.entries(coins)
      .map((entry) => +entry[0] * +entry[1])
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    if (!this.checkProductAvailability(slot).inStock) {
      return {
        errorMessage: "Product is not in stock",
      }
    }
    if (
      !this.checkProvisionOfEnoughMoney(slot, totalGivenByUser)
        .enoughMoneyProvided
    ) {
      return {
        errorMessage: `You need to provide enough money`,
      }
    }
    if (
      !this.checkPossibilityToGiveEnoughChange(totalGivenByUser)
        .possibleTogiveEnoughChange
    ) {
      return {
        errorMessage: `There is not enough change to give back right now`,
      }
    }
    this.addCoinsToInventory(coins)
    this.reduceProduct(slot)
    const change = this.checkProvisionOfEnoughMoney(
      slot,
      totalGivenByUser
    ).change
    const changeToBeGivenToUser = this.returnChange(change)

    return { success: "Purchase was successful", changeToBeGivenToUser }
  }
  addCoinsToInventory(coins: { [key: string]: number }): { success: boolean } {
    Object.entries(coins).forEach((entry) => {
      if (entry[0] in this.change) {
        this.change[entry[0]] = this.change[entry[0]] + +entry[1]
      }
    })
    return {
      success: true,
    }
  }
  removeCoinsFromInventory(coins: { [key: string]: number }): void {
    Object.entries(coins).forEach((entry) => {
      if (entry[0] in this.change && this.change[entry[0]] > 0) {
        this.change[entry[0]] = this.change[entry[0]] - +entry[1]
      }
    })
  }

  reduceProduct(slot: number): void {
    this.productsAvailable.filter(
      ({ productSlot }) => productSlot === slot
    )[0].amountInStock =
      this.productsAvailable.filter(
        ({ productSlot }) => productSlot === slot
      )[0].amountInStock - 1
  }
  returnChange = (change: number): { [key: string]: number } => {
    let changeToBeReturned: { [key: string]: number } = {}
    const changesAvaialble = Object.keys(this.change)
    console.log(changesAvaialble)
    if (change === 0) {
      return {
        change: 0,
      }
    }

    changesAvaialble.forEach((changeEntry) => {
      const modulus = +change % +changeEntry
      if (modulus === 0) {
        const changeFactor = +change / +changeEntry
        if (this.change[changeEntry] >= changeFactor) {
          changeToBeReturned = { [changeEntry]: changeFactor }
          this.removeCoinsFromInventory(changeToBeReturned)
        }
      }
    })
    return changeToBeReturned
  }
}

const machine1 = new VendingMachine(
  [
    { name: "cocacola", productSlot: 1, amountInStock: 0, pricePerItem: 0 },
    { name: "fanta", productSlot: 2, amountInStock: 0, pricePerItem: 0 },
    { name: "mountainDew", productSlot: 3, amountInStock: 0, pricePerItem: 0 },
  ],
  ["20", "10", "5", "25"]
)

// Set quantity of products available
// machine1.setNumberofProductsAvailable(1, 30)
// machine1.setNumberofProductsAvailable(2, 10)
// machine1.setNumberofProductsAvailable(3, 20)

// Set pricing for the products
// machine1.setPrice(1, 50)
// machine1.setPrice(2, 60)
// machine1.setPrice(3, 70)

// Set each coins available
// machine1.addCoinsToInventory({ "20": 30, "10": 20, "5": 30 })

// Buy a coc soda

// console.log(machine1.buyProduct(1, { 20: 3 }))
// console.log(machine1.getchange)

// console.log(machine1)
