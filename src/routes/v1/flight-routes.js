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

/*
 * PATCH : /flights/:id
 * req-body : {
 *    seats,
 *    dec,
 * }
 */
router.patch(
  "/:id",
  FlightMiddleware.validateUpdateRemainingSeatsRequest,
  FlightController.updateRemainingSeats
);

module.exports = router;
