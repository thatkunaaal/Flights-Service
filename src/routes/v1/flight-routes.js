const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middleware");

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightMiddleware.validateDepartureAndArrivalTime,
  FlightController.createFlight
);

module.exports = router;
