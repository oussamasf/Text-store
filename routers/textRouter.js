const express = require("express");
const textControllers = require("../controllers/textControllers");

const router = express.Router();

// GET POST
router
  .route("/")
  .get(textControllers.getTexts)
  .post(textControllers.createText);

// fuzzy search endpoint  <there is a note>
router.route("/search").get(textControllers.search);

// states of Every Text <there is a note>
router.route("/wait-list/:state").get(textControllers.getWaitList);
router.route("/wait-list/").get(textControllers.getWaitList);
router.route("/wait-list/submit/:id").get(textControllers.submitState);
router.route("/wait-list/approve/:id").get(textControllers.approveState);
router.route("/wait-list/reject/:id").get(textControllers.rejectState);

router.route("/:id/count/").get(textControllers.CountText);
router.route("/:id/count/:lng").get(textControllers.langText);

// Requests on specific text
router
  .route("/:id")
  .get(textControllers.getText)
  .patch(textControllers.updateText)
  //   additional route it isn't mentioned in requirement
  .delete(textControllers.deleteText);

module.exports = router;
