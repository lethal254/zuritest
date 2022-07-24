"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendingmachine_1 = require("../controllers/vendingmachine");
const router = (0, express_1.Router)();
router.post("/buyProduct", vendingmachine_1.buyProduct);
