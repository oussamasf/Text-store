const textModel = require("../models/textModel");
const APIfeatures = require("../utils/apiFeatures");
const catchfn = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getTexts = catchfn(async (req, res, next) => {
  // excuting the query
  const features = new APIfeatures(textModel.find(), req.query)
    .filter()
    .sorting()
    .fielding()
    .pagination();
  const texts = await features.query;

  // send response
  res.status(200).json({
    status: "success",
    result: texts.length,
    data: { texts },
  });
});

exports.getText = catchfn(async (req, res, next) => {
  const oneText = await textModel.findById(req.params.id);

  if (!oneText) {
    return next(new AppError("not-found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { oneText },
  });
});

exports.createText = catchfn(async (req, res, next) => {
  const newText = await textModel.create(req.body);
  res.status(201).json({
    status: "success",
    message: "<message>",
    data: newText,
  });
});

exports.updateText = catchfn(async (req, res, next) => {
  const updatedText = await textModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidator: true }
  );

  if (!updatedText) {
    return next(new AppError("not-found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "<message>",
    data: { updatedText },
  });
});

exports.deleteText = catchfn(async (req, res, next) => {
  const text = await textModel.findByIdAndDelete(req.params.id);

  if (!text) {
    return next(new AppError("not-found", 404));
  }

  res.status(204).json({
    status: "success",
    message: "<deleted>",
  });
});
