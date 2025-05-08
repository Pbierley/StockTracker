const { connectToDB } = require("../db/mongoClient"); // or wherever your DB code is
const jwt = require("jsonwebtoken");
const secretKey = process.env.JSON_WEB_KEY;

const createComment = async (req, res) => {
  console.log("comment would be created here");
};
const deleteComment = async (req, res) => {
  console.log("comment would be deleted here");
};

module.exports = { createComment, deleteComment };
