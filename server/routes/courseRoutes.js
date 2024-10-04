const courseRouter = require("express").Router();
const {
  getCourses,
  findCourses,
  getCourse,
  purchaseCourse,
  getPurchases,
} = require("../controllers/courseController");
const userAuth = require("../middlewares/userAuth");
const userOptionalAuth = require("../middlewares/userOptionalAuth");

courseRouter.get("/", userOptionalAuth, getCourses);

courseRouter.get("/find", findCourses);

courseRouter.get("/purchases", userAuth, getPurchases);

courseRouter.post("/buy", userAuth, purchaseCourse);

courseRouter.get("/:id", userOptionalAuth, getCourse);

module.exports = courseRouter;
