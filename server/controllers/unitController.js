const Unit = require("../models/Unit");
const Task = require("../models/Task");

// Create Unit
const createUnit = async (req, res) => {
  try {
    const { subjectId, name } = req.body;
    if (!name || !name.trim()) {
  return res.status(400).json({
    message:
      "Unit name is required",
  });
}

    const unit = await Unit.create({
      subject: subjectId,
      name,
    });

    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Units By Subject
const getUnitsBySubject = async (req, res) => {
  try {
    const units = await Unit.find({
      subject: req.params.subjectId,
    });

    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle Unit Completion
const toggleUnitCompletion = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    // Toggle completion status
    unit.completed = !unit.completed;

    await unit.save();

    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Unit
const deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(
      req.params.id
    );

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    // Delete related planner tasks
await Task.deleteMany({
  unit: req.params.id,
});

// Delete unit
await unit.deleteOne();

    res.status(200).json({
      message: "Unit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUnit,
  getUnitsBySubject,
  toggleUnitCompletion,
  deleteUnit,
};