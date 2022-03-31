const router = require("express").Router();
let Bill = require("../models/bill.model");

router.route("/add").post((req, res) => {
  const newBill = new Bill(req.body);
  newBill.save();
});

router.route("/:billNumber").get(async (req, res) => {
  const billNumber = req.params.billNumber;
  const getBill = await Bill.findOne({ billNumber });
  res.json(getBill);
});

router.route("/cancel").post(async (req, res) => {
  await Bill.findOneAndRemove({ billNumber: Number(req.body.billNumber) });
  res.json("cancel bill success");
});

module.exports = router;
