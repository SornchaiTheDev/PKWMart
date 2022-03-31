const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stock = new Schema({
  barcode: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
});

const Stock = mongoose.model("Stock", stock);

module.exports = Stock;
