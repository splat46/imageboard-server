const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/", async (req, res, next) => {
  res.send("Login Auth");
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        message: "Please supply a valid email and password",
      });
    } else {
      res.send({
        jwt: toJWT({ userId: 1 }),
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
