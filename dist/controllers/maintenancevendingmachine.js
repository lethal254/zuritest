"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventory = exports.setChange = exports.setPrices = exports.setQuantity = void 0;
const app_1 = require("../app");
const setQuantity = (req, res) => {
    if (req.body.slot) {
        const data = app_1.machine.setNumberofProductsAvailable(req.body.slot, req.body.amount);
        if (data.success) {
            res.status(200).send(data);
        }
        else {
            res.status(500).send("Something went wrong");
        }
    }
    else {
        res.status(500).send({ error: "You need to provide product details" });
    }
};
exports.setQuantity = setQuantity;
const setPrices = (req, res) => {
    if (req.body.slot) {
        const data = app_1.machine.setPrice(req.body.slot, req.body.amount);
        if (data.success) {
            res.status(200).send(data);
        }
        else {
            res.status(500).send("Something went wrong");
        }
    }
    else {
        res.status(500).send({ error: "You need to provide product details" });
    }
};
exports.setPrices = setPrices;
const setChange = (req, res) => {
    if (req.body.coins) {
        const data = app_1.machine.addCoinsToInventory(req.body.coins);
        if (data.success) {
            res.status(200).send(data);
        }
        else {
            res.status(500).send("Something went wrong");
        }
    }
    else {
        res.status(500).send({ error: "You need to provide product details" });
    }
};
exports.setChange = setChange;
const getInventory = (req, res) => {
    const inventory = app_1.machine.getInventory;
    res.status(200).send(inventory);
};
exports.getInventory = getInventory;
