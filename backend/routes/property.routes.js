const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

router.get("/", propertyController.getAll);
router.get("/:id", propertyController.getById);
router.post("/", propertyController.create);
router.put("/:id", propertyController.update);
router.delete("/:id", propertyController.remove);

module.exports = router;
