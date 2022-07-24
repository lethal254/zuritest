"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyProduct = void 0;
const app_1 = require("../app");
const buyProduct = (req, res) => {
    if (req.body.slot) {
        const data = app_1.machine.buyProduct(req.body.slot, req.body.coins);
        if (data.success) {
            res.status(200).send(data);
        }
        else if (data) {
            res.status(500).send(data);
        }
        console.log(data);
    }
    else {
        res.status(500).send({ error: "You need to provide product details" });
    }
};
exports.buyProduct = buyProduct;
