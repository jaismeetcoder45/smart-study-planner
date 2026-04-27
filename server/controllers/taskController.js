const Task = require("../models/Task");

// Get Today's Tasks
// Get Today's + Overdue Tasks
const getTodayTasks = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      user: req.user._id,
      completed: false,
      date: {
        $lte: today,
      },
    })
      .populate("subject")
      .populate("unit")
      .sort({ date: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Manual Task
const createManualTask = async (req, res) => {
  try {
    const { title, date } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      date,
      type: "manual",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle Task Completion
const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Planner Tasks
const getPlannerTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
      type: "generated",
    })
      .populate("subject")
      .populate("unit")
      .sort({ date: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Planner Tasks
const deletePlannerTasks = async (req, res) => {
  try {
    await Task.deleteMany({
      user: req.user._id,
      type: "generated",
    });

    res.status(200).json({
      message: "Planner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTodayTasks,
  createManualTask,
  toggleTaskCompletion,
  getPlannerTasks,
  deletePlannerTasks,
};