const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to mongodb");
});

const stockRouter = require("./routers/stockRouter");
const counterRouter = require("./routers/CounterRouter");
const countRouter = require("./routers/countRouter");
const billRouter = require("./routers/billRouter");

app.use("/counter", counterRouter);
app.use("/stock", stockRouter);
app.use("/count", countRouter);
app.use("/bill", billRouter);

app.get("/", (req, res) => {
  res.send("Work");
});

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});
