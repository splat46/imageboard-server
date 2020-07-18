const express = require("express");
const { Router } = require("express");
const router = new Router();
const app = express();
const bcrypt = require("bcrypt");

const User = require("../models").user;

app.use(router);

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res
        .status(400)
        .send("Please fill in all the details or email is already in use");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword, // create hashed password
        fullName,
      });
      res.json(newUser);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const findUser = await User.findAll();
    res.json(findUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
