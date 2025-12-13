const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");

router.get("/:id", CityController.getCity);
router.get("/", CityController.getAllCity);

module.exports = router;
