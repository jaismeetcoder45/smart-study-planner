const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getTodayTasks,
  createManualTask,
  toggleTaskCompletion,
  getPlannerTasks,
  deletePlannerTasks,
} = require("../controllers/taskController");

const router = express.Router();

// Today's Tasks
router.get("/today", protect, getTodayTasks);

router.get("/planner", protect, getPlannerTasks);

router.delete(
  "/planner",
  protect,
  deletePlannerTasks
);

// Create Manual Task
router.post("/manual", protect, createManualTask);

// Toggle Task
router.put(
  "/toggle/:id",
  protect,
  toggleTaskCompletion
);

module.exports = router;