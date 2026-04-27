const Subject = require("../models/Subject");
const Task = require("../models/Task");

const getProgressAnalytics = async (req, res) => {
  try {
    // Get user's subjects
    const subjects = await Subject.find({
      user: req.user._id,
    });

    // Get user's tasks
    const tasks = await Task.find({
        user: req.user._id,
        type: "generated",
      });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const pendingTasks =
      totalTasks - completedTasks;

    const progressPercentage =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          );

    res.status(200).json({
      totalSubjects: subjects.length,
      completedUnits: completedTasks,
      pendingUnits: pendingTasks,
      progressPercentage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Study Streak
const getStudyStreak = async (req, res) => {
  try {
    const Task = require("../models/Task");

    const tasks = await Task.find({
      user: req.user._id,
      completed: true,
    }).sort({ date: -1 });

    if (tasks.length === 0) {
      return res.status(200).json({
        streak: 0,
      });
    }

    // Unique completed dates
    const completedDates = [
      ...new Set(
        tasks.map((task) =>
          new Date(task.date)
            .toISOString()
            .split("T")[0]
        )
      ),
    ];

    let streak = 0;

    let currentDate = new Date();

    for (let i = 0; i < completedDates.length; i++) {
      const taskDate = new Date(
        completedDates[i]
      );

      const diffTime =
        currentDate - taskDate;

      const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
      );

      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }

    res.status(200).json({
      streak,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProgressAnalytics,
  getStudyStreak,
};