const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middleware");

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightMiddleware.validateDepartureAndArrivalTime,
  FlightMiddleware.validateDepartureAndArrivalAirportId,
  FlightController.createFlight
);

/*
 * GET
 * /api/v1/flights
 */
router.get("/", FlightController.getAllFlights);

/*
 * GET : /flights/:id 
 * req-body {}
 */
router.get("/:id", FlightController.getFlight);

module.exports = router;
