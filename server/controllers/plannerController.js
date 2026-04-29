const Subject = require("../models/Subject");
const Unit = require("../models/Unit");
const Task = require("../models/Task");

// Generate Study Plan
const generateStudyPlan = async (req, res) => {
  try {
    const { examDate } = req.body;

    // Get user's subjects
    const subjects = await Subject.find({
      user: req.user._id,
    });

    const subjectIds = subjects.map(
      (subject) => subject._id
    );

    // Get incomplete units
    const units = await Unit.find({
      subject: { $in: subjectIds },
      completed: false,
    }).populate("subject");

    if (units.length === 0) {
      return res.status(400).json({
        message: "No incomplete units found",
      });
    }

    // Calculate available days
    const today = new Date();

    const exam = new Date(examDate);

    const timeDifference =
      exam.getTime() - today.getTime();

    const totalDays = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24)
    );

    if (totalDays <= 0) {
      return res.status(400).json({
        message: "Invalid exam date",
      });
    }

    // Generate schedule
    const schedule = [];

    let currentDay = 0;

    // Remove old incomplete planner tasks
      await Task.deleteMany({
        user: req.user._id,
        completed: false,
      });

    for (let i = 0; i < units.length; i++) {
      const studyDate = new Date();

      studyDate.setDate(
        today.getDate() + currentDay
      );

      schedule.push({
        date: studyDate,
        subject: units[i].subject.name,
        unit: units[i].name,
      });
  

            await Task.create({
        user: req.user._id,
        subject: units[i].subject._id,
        unit: units[i]._id,
        title: `${units[i].subject.name} - ${units[i].name}`,
        date: studyDate,
        type: "generated",
      });

      currentDay++;

      // Restart cycle if days exceeded
      if (currentDay >= totalDays) {
        currentDay = 0;
      }
    }

    res.status(200).json({
      totalDays,
      totalUnits: units.length,
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateStudyPlan,
};