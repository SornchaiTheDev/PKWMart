const router = require("express").Router();
let Count = require("../models/count.model");

router.route("/").get((req, res) => {
  Count.findOne()
    .then((stock) => res.json(stock))
    .catch((err) => res.json("err : " + err));
});

module.exports = router;
