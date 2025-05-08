const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JSON_WEB_KEY);
    req.user = user;
    next();
  } catch {
    res.clearCookie("token");
    console.log("Cookie monster ate ur cookies");
    res.status(401).json({ message: "Session expired. Please log in again." });
  }
};

module.exports = { authToken };
