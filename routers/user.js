const express = require("express");
const { Router } = require("express");
const router = new Router();
const app = express();

const User = require("../models/user");

app.use(router);

router.get("/", (req, res, next) => {
  res.json(User);
});
module.exports = router;
