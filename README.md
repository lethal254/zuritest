# ZURI TEST

This is my implementation of the vending machine coding challenge.

## How to run the code

- Clone the repository
- Run "npm install" on the project's root directory
- Open two terminals
- Run "npm run build" on the first terminal window - this will run the typescript compiler on watch mode
- Then run npm run dev on the other terminal window to start the local server

## API Endpoints

The maintenance view should update the inventory before the users are able to make successful purchases

### User view

- BuyProduct [post] - /uservm/products - {slot:number,coins:object }
- Get products available [GET] - /uservm/products

### Maintenance view

- Set change [post] - /maintenancevm/setChange - {coins:object} e.g {"20":5, "10":3}
- Set product slot prices - /maintenancevm/setPrices - {slot:number,amount:number}
- Set products quantity - /maintenancevm/setQuantity - {slot:number,amount:number}
- Get inventory - /maintenancevm/inventory
