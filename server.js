const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("main route called");
  res.render("index");
});

const stocksRouter = require("./routes/stocks");
const usersRouter = require("./routes/users");

app.use("/stocks", stocksRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT);
