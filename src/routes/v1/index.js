const express = require("express");
const { infoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane-route");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);

router.get("/info", infoController);

module.exports = router;
