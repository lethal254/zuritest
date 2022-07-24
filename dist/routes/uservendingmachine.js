"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uservendingmachine_1 = require("../controllers/uservendingmachine");
const router = (0, express_1.Router)();
router.post("/buyProduct", uservendingmachine_1.buyProduct);
router.get("/products", uservendingmachine_1.getProducts);
exports.default = router;
