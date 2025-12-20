const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middleware");
const router = express.Router();

router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);
router.delete("/:id", AirportController.destroyAirport);
router.get("/:id", AirportController.getAirport);
router.get("/", AirportController.getAirports);
router.patch("/:id", AirportController.updateAirport);

module.exports = router;
