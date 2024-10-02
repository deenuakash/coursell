const userRouter = require("express").Router();
const {
  signup,
  signin,
  purchases,
  purchase,
  checkUser,
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

userRouter.post("/checkUser", checkUser);

userRouter.post("/sendOTP", sendOTP);

userRouter.post("/verifyOTP", verifyOTP);

userRouter.put("/resetPassword", resetPassword);

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.post("/purchase/:courseId", userAuth, purchase);

userRouter.get("/purchases", userAuth, purchases);

module.exports = userRouter;
