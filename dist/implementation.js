"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VendingMachine {
    constructor(productsAvailable, coinsAccepted) {
        this.productsAvailable = productsAvailable;
        this.coinsAccepted = coinsAccepted;
        this.change = {};
        this.returnChange = (change) => {
            let changeToBeReturned = {};
            const changesAvaialble = Object.keys(this.change);
            console.log(changesAvaialble);
            if (change === 0) {
                return {
                    change: 0,
                };
            }
            changesAvaialble.forEach((changeEntry) => {
                const modulus = +change % +changeEntry;
                if (modulus === 0) {
                    const changeFactor = +change / +changeEntry;
                    if (this.change[changeEntry] >= changeFactor) {
                        changeToBeReturned = { [changeEntry]: changeFactor };
                        this.removeCoinsFromInventory(changeToBeReturned);
                    }
                }
            });
            return changeToBeReturned;
        };
        // We loop through the coins accepted when configuring a vending machine and set them as changes available with defaults of 0
        coinsAccepted.forEach((coin) => {
            this.change[coin] = 0;
        });
    }
    get getInventory() {
        return { change: this.change, productsAvailable: this.productsAvailable };
    }
    get getProductsAvailable() {
        return { productsAvailable: this.productsAvailable };
    }
    setPrice(slot, price) {
        this.productsAvailable.filter(({ productSlot }) => productSlot === slot)[0].pricePerItem = price;
        return {
            success: true,
        };
    }
    setNumberofProductsAvailable(slot, numberAvailable) {
        this.productsAvailable.filter(({ productSlot }) => productSlot === slot)[0].amountInStock = numberAvailable;
        return {
            success: true,
        };
    }
    checkProductAvailability(slot) {
        const product = this.productsAvailable.filter(({ productSlot }) => productSlot === slot)[0];
        if (product.amountInStock > 0) {
            return {
                inStock: true,
            };
        }
        else {
            return {
                inStock: false,
            };
        }
    }
    checkProvisionOfEnoughMoney(slot, amountProvided) {
        const product = this.productsAvailable.filter(({ productSlot }) => productSlot === slot)[0];
        if (amountProvided >= product.pricePerItem) {
            return {
                enoughMoneyProvided: true,
                change: amountProvided - product.pricePerItem,
            };
        }
        else {
            return {
                enoughMoneyProvided: false,
                change: 0,
            };
        }
    }
    checkPossibilityToGiveEnoughChange(amountGivenByUser) {
        const totalCoinsValueInInventory = Object.entries(this.change)
            .map((entry) => +entry[0] * +entry[1])
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (totalCoinsValueInInventory - amountGivenByUser > 0) {
            return {
                possibleTogiveEnoughChange: true,
            };
        }
        return {
            possibleTogiveEnoughChange: false,
        };
    }
    buyProduct(slot, coins) {
        const totalGivenByUser = Object.entries(coins)
            .map((entry) => +entry[0] * +entry[1])
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        if (!this.checkProductAvailability(slot).inStock) {
            return {
                errorMessage: "Product is not in stock",
            };
        }
        if (!this.checkProvisionOfEnoughMoney(slot, totalGivenByUser)
            .enoughMoneyProvided) {
            return {
                errorMessage: `You need to provide enough money`,
            };
        }
        if (!this.checkPossibilityToGiveEnoughChange(totalGivenByUser)
            .possibleTogiveEnoughChange) {
            return {
                errorMessage: `There is not enough change to give back right now`,
            };
        }
        this.addCoinsToInventory(coins);
        this.reduceProduct(slot);
        const change = this.checkProvisionOfEnoughMoney(slot, totalGivenByUser).change;
        const changeToBeGivenToUser = this.returnChange(change);
        return { success: "Purchase was successful", changeToBeGivenToUser };
    }
    addCoinsToInventory(coins) {
        Object.entries(coins).forEach((entry) => {
            if (entry[0] in this.change) {
                this.change[entry[0]] = this.change[entry[0]] + +entry[1];
            }
        });
        return {
            success: true,
        };
    }
    removeCoinsFromInventory(coins) {
        Object.entries(coins).forEach((entry) => {
            if (entry[0] in this.change && this.change[entry[0]] > 0) {
                this.change[entry[0]] = this.change[entry[0]] - +entry[1];
            }
        });
    }
    reduceProduct(slot) {
        this.productsAvailable.filter(({ productSlot }) => productSlot === slot)[0].amountInStock =
            this.productsAvailable.filter(({ productSlot }) => productSlot === slot)[0].amountInStock - 1;
    }
}
exports.default = VendingMachine;
const machine1 = new VendingMachine([
    { name: "cocacola", productSlot: 1, amountInStock: 0, pricePerItem: 0 },
    { name: "fanta", productSlot: 2, amountInStock: 0, pricePerItem: 0 },
    { name: "mountainDew", productSlot: 3, amountInStock: 0, pricePerItem: 0 },
], ["20", "10", "5", "25"]);
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
