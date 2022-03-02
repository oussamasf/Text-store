const Fuse = require("fuse.js");

const textModel = require("../models/textModel");
const APIfeatures = require("../utils/apiFeatures");
const catchfn = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getTexts = catchfn(async (req, res, next) => {
  // excuting the query

  const features = new APIfeatures(textModel.find(), req.query).pagination();
  const texts = await features.query;

  // send response
  res.status(200).json({
    status: "success",
    result: texts.length,
    page: req.query.page,
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

// constroller for fuzzy search
exports.search = catchfn(async (req, res, next) => {
  // excuting the query

  const features = new APIfeatures(textModel.find(), req.query).all();
  const texts = await features.query;
  const fuse = new Fuse(texts, {
    keys: ["textEnglish", "textFrench"],
  });

  // send response
  res.status(200).json({
    status: "success",
    data: {
      search: req.query.q,
      result: fuse.search(req.query.q),
    },
  });
});

// controller for filtering rejected,submitted texts and draft
exports.getWaitList = catchfn(async (req, res, next) => {
  let texts;
  if (!req.params.state) {
    texts = await textModel.find({ state: /draft|rejected|submitted/gi });
  } else if (req.params.state === "approved") {
    return next(new AppError("approved txts can't be found here", 404));
  } else {
    texts = await textModel.find(req.params);
    if (!texts[0]) throw new AppError("misspelled paramater", 404);
  }

  res.status(200).json({
    status: "success",
    param: req.params.state,
    data: { texts },
  });
});

//  submit
exports.submitState = catchfn(async (req, res, next) => {
  let Text = await textModel.findById(req.params.id);
  if (Text.state === "draft" || Text.state === "rejected") {
    let updatedText = await textModel.findByIdAndUpdate(
      req.params.id,
      { state: "submitted" },
      { new: true, runValidator: true }
    );
    res.status(200).json({
      status: "success",
      message: "<message>",
      data: { updatedText },
    });
  } else {
    throw new AppError("not allowed", 405);
  }
});

// approve
exports.approveState = catchfn(async (req, res, next) => {
  let Text = await textModel.findById(req.params.id);
  if (Text.state === "submitted") {
    let updatedText = await textModel.findByIdAndUpdate(
      req.params.id,
      { state: "approved" },
      { new: true, runValidator: true }
    );
    res.status(200).json({
      status: "success",
      message: "<message>",
      data: { updatedText },
    });
  } else {
    throw new AppError("not allowed", 405);
  }
});

// approve
exports.rejectState = catchfn(async (req, res, next) => {
  let Text = await textModel.findById(req.params.id);
  if (Text.state === "submitted") {
    let updatedText = await textModel.findByIdAndUpdate(
      req.params.id,
      { state: "rejected" },
      { new: true, runValidator: true }
    );
    res.status(200).json({
      status: "success",
      message: "<message>",
      data: { updatedText },
    });
  } else {
    throw new AppError("not allowed", 405);
  }
});

exports.CountText = catchfn(async (req, res, next) => {
  const text = await textModel.findById(req.params.id);
  if (!text) {
    return next(new AppError("not-found", 404));
  }
  let counter =
    text.textEnglish.split(" ").length +
    text.textFrench.split(" ").length +
    text.textArabic.split(" ").length;

  res.status(200).json({
    status: "success",
    data: counter,
  });
});

exports.langText = catchfn(async (req, res, next) => {
  let text = await textModel.findById(req.params.id);
  console.log(req.params.lng);
  if (req.params.lng === "en") {
    const counter = text.textEnglish.split(" ").length;
    res.status(200).json({
      status: "success",
      data: counter,
    });
  } else if (req.params.lng === "fr") {
    const counter = text.textFrench.split(" ").length;
    res.status(200).json({
      status: "success",
      data: counter,
    });
  } else if (req.params.lng === "ar") {
    const counter = text.textArabic.split(" ").length;
    res.status(200).json({
      status: "success",
      data: counter,
    });
  } else {
    return next(new AppError("not-found", 404));
  }
});
