const express = require("express");
const textControllers = require("../controllers/textControllers");

const router = express.Router();

router
  .route("/")
  .get(textControllers.getTexts)
  .post(textControllers.createText);
router
  .route("/:id")
  .get(textControllers.getText)
  .patch(textControllers.updateText)
  //   additional route it isn't mentioned in requirement
  .delete(textControllers.deleteText);

module.exports = router;
