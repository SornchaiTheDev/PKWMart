const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bill = new Schema({
  billNumber: { type: Number, required: true },
  payIn: { type: Number, required: true },
  items: { type: Object, required: true },
  time: { type: Date, required: true },
  status: { type: String },
  price: { type: Number },
  counter: { type: String },
});

const Bill = mongoose.model("Bill", bill);

module.exports = Bill;
