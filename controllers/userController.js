const { connectToDB } = require("../db/mongoClient"); // or wherever your DB code is
const jwt = require("jsonwebtoken");
const secretKey = process.env.JSON_WEB_KEY;

const findUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = await connectToDB();
    const users = db.collection("users");
    //  insure that the password match
    const user = await users.findOne({ email, password }); // directly in query

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    console.log("user backend result - ", user);
    const token = jwt.sign(user, process.env.JSON_WEB_KEY, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ error: "Failed to retrieve user data." });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign(
    {
      email,
      password,
    },
    secretKey,
    { expiresIn: "24h" }
  );

  console.log(token);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  try {
    const db = await connectToDB();
    const users = db.collection("users");
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }
    const result = await users.insertOne({ email, password, token });
    res
      .status(201)
      .json({ message: "User created", userId: result.insertedId });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { findUser, signupUser };
