const courseModel = require("../models/courseModel");

const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    console.log(courses);
    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const findCourses = async (req, res) => {
  const { query } = req.query;
  let courses = [];
  try {
    if (query) {
      courses = await courseModel.find({
        name: { $regex: query, $options: "i" },
      });
    }
    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { getCourses, findCourses };
