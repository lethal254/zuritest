"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.machine = void 0;
const express_1 = __importDefault(require("express"));
const implementation_1 = __importDefault(require("./implementation"));
const uservendingmachine_1 = __importDefault(require("./routes/uservendingmachine"));
const maintenancevendingmachine_1 = __importDefault(require("./routes/maintenancevendingmachine"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
// This is where we configure the machine we set the coins allowed as an array and products available as an array of objects
exports.machine = new implementation_1.default([
    { name: "cocacola", productSlot: 1, amountInStock: 0, pricePerItem: 0 },
    { name: "fanta", productSlot: 2, amountInStock: 0, pricePerItem: 0 },
    { name: "mountainDew", productSlot: 3, amountInStock: 0, pricePerItem: 0 },
], ["20", "10", "5", "25"]);
app.use((0, body_parser_1.json)());
app.use("/uservm", uservendingmachine_1.default);
app.use("/maintenancevm", maintenancevendingmachine_1.default);
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
