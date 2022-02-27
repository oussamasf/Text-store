const mongoose = require("mongoose");
// const validator = require("validator");
const textSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A text must have a title"],
      trim: true,
      maxlength: [20, "A Text name must have less or equal than 20 characters"],
      minlength: [2, "A Text name must have more or equal than 2 characters"],
      // validate: [validator.isAlpha, 'title name must only contain characters'],
    },
    text: {
      type: Number,
      required: [true, "A Text must have a duration"],
    },
    labels: {
      type: [String],
      //   enum: {
      //     values: ["sports", "politics", "others"],
      //     message: "you can add label to your text ",
      //   },
    },
    summary: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
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
