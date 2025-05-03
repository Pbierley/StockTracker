const { connectToDB } = require("../db/mongoClient"); // or wherever your DB code is

const getStockPrices = async (req, res) => {
  try {
    const db = await connectToDB(); // ensure connection
    const stocks = await db.collection("stocks").find({}).toArray(); // fetch all stocks
    res.json(stocks); // send to frontend
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    res.status(500).json({ error: "Failed to retrieve stock data." });
  }
};

//  currently not using this

module.exports = { getStockPrices };
