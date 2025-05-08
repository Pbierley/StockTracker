const { connectToDB } = require("../db/mongoClient");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JSON_WEB_KEY;

const createComment = async (req, res) => {
  const { ticker, username, comment } = req.body;
  try {
    // Check if user is logged in
    const db = await connectToDB();
    const comments = db.collection("comments");
    // Create new comment document
    const newComment = {
      username,
      ticker,
      comment,
      createdAt: new Date(),
    };
    const result = await comments.insertOne(newComment);
    res
      .status(201)
      .json({ message: "Comment posted", commentId: result.insertedId });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ error: "Failed to post comment." });
  }
};

const deleteComment = async (req, res) => {
  console.log("comment would be deleted here");
};
const getStockComments = async (req, res) => {
  const ticker = req.params.ticker;
  try {
    const db = await connectToDB();
    const comments = db.collection("comments");

    const stockComments = await comments.find({ ticker: ticker }).toArray();

    res.status(200).json({ comments: stockComments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
};

module.exports = { createComment, deleteComment, getStockComments };
