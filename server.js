const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("main route called");
  res.render("index");
});

const stocksRouter = require("./routes/stocks");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

app.use("/stocks", stocksRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.listen(process.env.PORT);
