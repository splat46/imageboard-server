const express = require("express");
const app = express();
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const loginRouter = require("./routers/auth");
const PORT = process.env.PORT || 4000;
const jsonParser = express.json();
app.use(jsonParser);

app.use("/images", imageRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
