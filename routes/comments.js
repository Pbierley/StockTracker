// express
const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  getStockComments,
} = require("../controllers/commentController");
const { authToken } = require("../middleware/authToken");

//  imports
router.post("/create", authToken, createComment);
router.post("/delete", authToken, deleteComment);
router.get("/:ticker", authToken, getStockComments);

module.exports = router;
