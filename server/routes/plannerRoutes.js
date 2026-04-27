const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  generateStudyPlan,
} = require("../controllers/plannerController");

const router = express.Router();

// Generate Planner
router.post(
  "/generate",
  protect,
  generateStudyPlan
);

module.exports = router;