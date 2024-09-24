const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const userModel = require("../models/userModel");
const { signupSchema, signinSchema } = require("../utils/validationSchema");
const courseModel = require("../models/courseModel");
const purchaseModel = require("../models/purchaseModel");
const { default: mongoose } = require("mongoose");

const signup = async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  const parsedData = signupSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parsedData.error.errors });
  }

  try {
    const existingUser = await userModel.findOne({ email, role: "user" });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    res.status(201).json({
      message: "Successfully Signed up",
      user: {
        email: newUser.email,
        firstName: newUser.firstName,
        _id: newUser._id,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const signin = async function (req, res) {
  const { email, password } = req.body;

  const parsedData = signinSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid credentials",
      error: parsedData.error.errors,
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Email not available. Signin to continue",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Password is incorrect",
      });
    }

    const token = await jwt.sign(
      { _id: user._id, role: user.role },
      process.env.USER_JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Signed in Successfully",
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Sever Error",
    });
  }
};

const purchase = async function (req, res) {
  try {
    const { courseId } = req.params;

    // Validate the courseId
    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid course ID format" });
    }

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course is invalid or not available",
      });
    }

    const alreadyPurchased = await purchaseModel.findOne({
      courseId,
      userId: req.user._id,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        message: "Course already purchased",
      });
    }

    const purchase = new purchaseModel({
      courseId,
      userId: req.user._id,
      price: course.price,
    });

    await purchase.save();

    res.status(200).json({
      message: "Course purchased successfully",
      course,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const purchases = async function (req, res) {
  try {
    const purchases = await purchaseModel.find({ userId: req.user._id });

    if (!purchases || purchases.length === 0) {
      return res.status(200).json({
        message: "No courses were purchased",
      });
    }

    const courseIds = purchases.map((purchase) => purchase.courseId);

    const purchasedCourses = await courseModel.find({
      _id: { $in: courseIds },
    });

    res.status(200).json({
      purchasedCourses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { signup, signin, purchases, purchase };
