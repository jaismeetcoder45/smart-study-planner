const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createUnit,
  getUnitsBySubject,
  toggleUnitCompletion,
  deleteUnit,
} = require("../controllers/unitController");

const router = express.Router();

// Create Unit
router.post("/", protect, createUnit);

// Get Units By Subject
router.get("/:subjectId", protect, getUnitsBySubject);

router.put("/toggle/:id", protect, toggleUnitCompletion);

router.delete(
  "/:id",
  protect,
  deleteUnit
);

module.exports = router;