const express = require("express");
const { infoController } = require("../../controllers");
const router = express.Router();
const airplaneRoutes = require("./airplane-route");
const cityRoutes = require("./city-routes");

router.use("/airplanes", airplaneRoutes);
router.get("/info", infoController);
router.use("/cities", cityRoutes);

module.exports = router;
