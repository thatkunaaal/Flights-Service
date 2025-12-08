const express = require("express");
const router = express.Router();
const { airplaneController } = require("../../controllers");
const { AirplaneMiddleware } = require("../../middleware");

router.post(
  "/",
  AirplaneMiddleware.validateCreateRequest,
  airplaneController.createAirplane
);

module.exports = router;
