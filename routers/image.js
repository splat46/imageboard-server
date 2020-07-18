const express = require("express");
const { Router } = require("express");
const router = new Router();
const app = express();

const Images = require("../models").image;

app.use(router);

router.post("/", async (req, res, next) => {
  // console.log(req.body);

  const newImage = await Images.create(req.body);
  res.json(newImage);
});

router.get("/", async (req, res, next) => {
  res.json(Images);
});
module.exports = router;
