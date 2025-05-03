// express
const express = require("express");
const router = express.Router();

//  imports
const { getStockPrices, getStock } = require("../controllers/stockController");

router.get("/", getStockPrices);
router.get("/:ticker", getStock);

router.get("/", (req, res) => {
  // now make it call it from the apu
  res.json({ text: "stocks like apple and tsla" });
});
router.get("/new", (req, res) => {
  res.send("stocks like apple and tsla");
});

module.exports = router;
