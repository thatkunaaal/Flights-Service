const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middleware");

router.post(
  "/",
  AirplaneMiddleware.validateCreateRequest,
  AirplaneController.createAirplane
);

router.delete("/:id", AirplaneController.destroyAirplane);

router.get("/:id", AirplaneController.getAirplane);
router.get("/", AirplaneController.getAllAirplane);

router.patch(
  "/:id",
  AirplaneMiddleware.validateUpdateReqeuest,
  AirplaneController.updateAirplane
);

module.exports = router;
