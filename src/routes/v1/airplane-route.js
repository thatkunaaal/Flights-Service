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

module.exports = router;
