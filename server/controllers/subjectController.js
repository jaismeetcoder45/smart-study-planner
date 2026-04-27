const Unit = require("../models/Unit");

const Subject = require("../models/Subject");

// Create Subject
const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const subject = await Subject.create({
      user: req.user._id,
      name,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      user: req.user._id,
    });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(
      req.params.id
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    // Delete related units
    await Unit.deleteMany({
      subject: subject._id,
    });

    // Delete subject
    await subject.deleteOne();

    res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getSubjects,
  deleteSubject,
};