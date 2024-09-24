const adminRouter = require("express").Router();
const {
  signup,
  signin,
  courses,
  createCourse,
  updateCourse,
} = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

adminRouter.post("/signin", signin);

adminRouter.post("/signup", signup);

adminRouter.get("/courses", adminAuth, courses);

adminRouter.post("/course", adminAuth, createCourse);

adminRouter.put("/course/:_id", adminAuth, updateCourse);

module.exports = adminRouter;
