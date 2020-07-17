const express = require("express");
const { Router } = express;
const router = new Router();
const app = express();
app.use(router);

const port = 4000;
app.get("/", (req, res) => res.send("Welcome to the homepage!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));
module.exports = router;
