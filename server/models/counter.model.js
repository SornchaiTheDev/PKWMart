const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const counter = new Schema({
  last_open: { type: Date, required: true },
  salary: { type: Number, required: true },
  counter: { type: Number, required: true },
});

const Counter = mongoose.model("Counter", counter);

module.exports = Counter;
