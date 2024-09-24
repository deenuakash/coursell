const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");
const courseModel = require("../models/courseModel");
const {
  signinSchema,
  signupSchema,
  courseSchema,
} = require("../utils/validationSchema");

const signup = async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  const parsedData = signupSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parsedData.error.errors });
  }

  try {
    const existingUser = await userModel.findOne({ email, role: "admin" });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "admin",
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
      process.env.ADMIN_JWT_SECRET,
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

const createCourse = async function (req, res) {
  const { name, description, price } = req.body;

  const parsedData = courseSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Invalid details", errors: parsedData.error.errors });
  }
  try {
    const course = new courseModel({
      name,
      description,
      price,
      createdBy: req.user._id,
    });
    await course.save();

    res.status(201).json({
      message: "Course created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const courses = async function (req, res) {
  try {
    const courses = await courseModel.find({ createdBy: req.user._id });
    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCourse = async function (req, res) {
  const { _id } = req.params;
  console.log(req.params);
  const { name, description, price } = req.body;

  const parsedData = courseSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res
      .status(400)
      .json({ message: "Invalid details", errors: parsedData.error.errors });
  }

  try {
    const course = await courseModel.findOneAndUpdate(
      { _id, createdBy: req.user._id },
      {
        name,
        description,
        price,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      course,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, signin, courses, createCourse, updateCourse };
