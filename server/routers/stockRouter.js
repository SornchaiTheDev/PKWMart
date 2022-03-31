const router = require("express").Router();
let Stock = require("../models/stock.model");
let Count = require("../models/count.model");

router.route("/").get((req, res) => {
  Stock.find()
    .then((stock) => res.json(stock))
    .catch((err) => res.json("err : " + err));
});

router.route("/:barcode").get((req, res) => {
  Stock.findOne({ barcode: req.params.barcode })
    .then((stock) => res.json(stock))
    .catch((err) => res.json("err : " + err));
});

router.route("/add").post(async (req, res) => {
  const barcode = req.body.barcode;
  const name = req.body.name;
  const price = Number(req.body.price);
  const newItem = new Stock({ barcode, name, price });
  try {
    await newItem.save();
    const count = await Count.findOne({ name: "count" });

    await Count.findOneAndUpdate(
      { name: "count" },
      {
        amount: count.amount + 1,
      }
    );

    res.json("add item success");
  } catch (err) {
    res.json("err : " + err);
  }
});

router.route("/update").post(async (req, res) => {
  const barcode = req.body.barcode;
  const name = req.body.name;
  const price = Number(req.body.price);
  await Stock.findOneAndUpdate({ barcode }, { barcode, name, price });
  res.json("updated success!");
});

router.route("/delete").post(async (req, res) => {
  try {
    await Stock.deleteOne({ barcode: req.body.barcode });
    const count = await Count.findOne({ name: "count" });
    if (count.amount <= 0) return res.json("err : cannot below zero");

    await Count.findOneAndUpdate(
      { name: "count" },
      {
        amount: count.amount - 1,
      }
    );
    res.json("deleted success!");
  } catch (err) {
    res.json("err :" + err);
  }
});

router.route("/check").post(async (req, res) => {
  const inStock = await Stock.findOne({ name: req.body.name });
  res.json(inStock !== null);
});

module.exports = router;
