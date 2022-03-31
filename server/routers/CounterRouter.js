const router = require("express").Router();
let Counter = require("../models/counter.model");

router.route("/update").post(async (req, res) => {
  const counter = await Counter.findOne({ counter: Number(req.body.counter) });
  const salary = counter.salary + req.body.total;
  await Counter.findOneAndUpdate(
    { counter: Number(req.body.counter) },
    { salary }
  );
  console.log(counter);
  res.json("success");
});

router.route("/:counter").get(async (req, res) => {
  const counter = req.params.counter;
  const getCounter = await Counter.findOne({ counter });
  res.json(getCounter);
});

router.route("/:counter/clear").get(async (req, res) => {
  // const price = Counter.findOne({ counter: Number(req.body.counter) });
  await Counter.findOneAndUpdate(
    { counter: req.body.counter },
    { salary: 0, last_open: new Date() }
  );
  res.json("success");
});

module.exports = router;
