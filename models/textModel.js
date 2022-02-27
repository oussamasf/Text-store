const mongoose = require("mongoose");
// const validator = require("validator");
const textSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A text must have a title"],
      trim: true,
      maxlength: [
        20,
        "A Text's title must have less or equal than 20 characters",
      ],
      minlength: [
        2,
        "A Text's title must have more or equal than 2 characters",
      ],
      // validate: [validator.isAlpha, 'title name must only contain characters'],
    },
    textEnglish: {
      type: String,
      required: [true, " English Text field is required"],
      maxlength: [280, "A Text must have less or equal than 280 characters"],
    },
    textArabic: {
      type: String,
      required: [true, "Arabic Text field is required"],
      maxlength: [280, "A Text must have less or equal than 280 characters"],
    },
    textFrench: {
      type: String,
      required: [true, "French Text field is required"],
      maxlength: [280, "A Text must have less or equal than 280 characters"],
    },

    labels: {
      type: [String],
      defaults: null,
      //   enum: {
      //     values: ["sports", "politics", "others"],
      //     message: "you can add label to your text ",
      //   },
    },
    summary: {
      type: String,
      defaults: null,
    },

    createdAt: {
      type: Date,
      defaults: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Text = mongoose.model("Text", textSchema);

module.exports = Text;
