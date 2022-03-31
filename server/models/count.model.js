const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const count = new Schema({
  amount: { type: Number, required: true },
});

const Count = mongoose.model("Count" , count)

module.exports = Count
