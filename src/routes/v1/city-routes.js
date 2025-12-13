const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middleware");

router.get("/:id", CityController.getCity);
router.get("/", CityController.getAllCity);

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

router.delete("/:id", CityController.destroyCity);

router.patch(
  "/:id",
  CityMiddleware.validateUpdateRequest,
  CityController.updateCity
);

module.exports = router;
