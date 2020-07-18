const express = require("express");
const { Router } = require("express");
const router = new Router();
const app = express();

const Images = require("../models").image;

app.use(router);

router.post("/", async (req, res, next) => {
  try {
    const newImage = await Images.create(req.body);
    res.json(newImage);
  } catch (error) {
    next(error);
  }
});

router.get("/messy", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Images.findAll();
    res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(req.query.limit || 25, 500);
    const offset = req.query.offset || 0;

    Images.findAndCountAll({ limit, offset })
      .then((result) => res.send({ images: result.rows, total: result.count }))
      .catch((error) => next(error));

    const getImages = await Images.findAll();
    res.json(getImages);
  } catch (error) {
    next(error);
  }
});

router.get("/:imageId", async (req, res, next) => {
  try {
    const image = await Images.findByPk(req.params.imageId);
    res.json(image);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
