const express = require("express");
require("dotenv").config();
require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const rateLimiter = require("./middlewares/rateLimiter");
const courseRouter = require("./routes/courseRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", rateLimiter);

app.use("/api/user", userRouter);

app.use("/api/admin", adminRouter);

app.use("/api/courses", courseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
