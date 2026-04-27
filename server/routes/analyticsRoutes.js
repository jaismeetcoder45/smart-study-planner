const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getProgressAnalytics,
  getStudyStreak,
} = require("../controllers/analyticsController");

const router = express.Router();

// Analytics Route
router.get("/", protect, getProgressAnalytics);

router.get(
  "/streak",
  protect,
  getStudyStreak
);

module.exports = router;