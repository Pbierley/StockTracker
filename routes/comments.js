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
router.delete("/comment/:commentId", authToken, deleteComment);

router.get("/:ticker", authToken, getStockComments);

module.exports = router;
