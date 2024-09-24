const express = require("express");
require("dotenv").config();
require("./config/db");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const rateLimiter = require("./middlewares/rateLimiter");

const app = express();

app.use(express.json());

app.use("/api", rateLimiter);

app.use("/api/user", userRouter);

app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
