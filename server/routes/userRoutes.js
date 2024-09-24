const userRouter = require("express").Router();
const {
  signup,
  signin,
  purchases,
  purchase,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.post("/purchase/:courseId", userAuth, purchase);

userRouter.get("/purchases", userAuth, purchases);

module.exports = userRouter;
