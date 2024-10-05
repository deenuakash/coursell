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
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

userRouter.post("/checkUser", checkUser);

userRouter.get("/profile", userAuth, getUserProfile);

userRouter.put("/updateProfile", userAuth, updateUserProfile);

userRouter.put("/changePassword", userAuth, changePassword);

userRouter.post("/sendOTP", sendOTP);

userRouter.post("/verifyOTP", verifyOTP);

userRouter.put("/resetPassword", resetPassword);

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.post("/purchase/:courseId", userAuth, purchase);

userRouter.get("/purchases", userAuth, purchases);

module.exports = userRouter;
