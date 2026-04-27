const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createSubject,
  getSubjects,
  deleteSubject,
} = require("../controllers/subjectController");

const router = express.Router();

// Create Subject
router.post("/", protect, createSubject);

// Get Subjects
router.get("/", protect, getSubjects);

router.delete(
  "/:id",
  protect,
  deleteSubject
);

module.exports = router;