const courseRouter = require("express").Router();
const { getCourses, findCourses } = require("../controllers/courseController");

courseRouter.get("/", getCourses);

courseRouter.get("/find", findCourses);

module.exports = courseRouter;
