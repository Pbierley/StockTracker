// express
const express = require("express");
const router = express.Router();

//  imports
const { getStockPrices, getStock } = require("../controllers/stockController");

router.get("/", getStockPrices);
router.post("/:ticker", getStock);
//  router.get("/:ticker", getStock);

module.exports = router;
