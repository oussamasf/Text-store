const AppError = require("../utils/appError");

const handleCastErrorDb = function (err) {
  const message = `invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const sendDevErr = function (err, res) {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const sendProdErr = function (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "server error",
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") {
    sendDevErr(err, res);
  } else if (process.env.NODE_ENV == "production") {
    console.log(process.env.NODE_ENV);

    let errror = { ...err };

    if (err.name == "CastError") {
      errror = handleCastErrorDb(errror);
    }
    sendProdErr(errror, res);
  }
};
