const express = require("express");
const morgan = require("morgan");

// express app
const app = express();

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use((req, res, next) => {
  console.log("a request has been emitted ..");
  next();
});
app.use((req, res, next) => {
  req.timee = new Date().toISOString();
  console.log(req.timee, "\n", req.headers);
  next();
});

// routes mounting
app.use("/text", textRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} endpoint doesn't exist`, 404));
});

module.exports = app;
