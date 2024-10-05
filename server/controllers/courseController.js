const courseModel = require("../models/courseModel");
const purchaseModel = require("../models/purchaseModel");

const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({}).sort({ id: 1 });
    let updatedCourses = courses.map((course) => ({
      ...course._doc,
      purchased: false,
    }));
    if (req.user) {
      updatedCourses = await updatePurchaseDetails(req.user, courses);
    }
    res.status(200).json({
      courses: updatedCourses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

const updatePurchaseDetails = async (user, courses) => {
  const purchases = await purchaseModel.find({ userId: user._id });
  if (purchases) {
    const purchasedCourseIds = purchases.map((purchase) =>
      purchase.courseId.toString()
    );
    return courses.map((course) => ({
      ...course._doc,
      purchased: purchasedCourseIds.includes(course._id.toString()),
    }));
  }
};

const findCourses = async (req, res) => {
  const { query } = req.query;
  let courses = [];
  try {
    if (query) {
      courses = await courseModel.find({
        name: { $regex: query, $options: "i" },
      });
    }
    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findOne({ _id: id });
    let updatedCourse = { ...course.toObject(), purchased: false };
    if (req.user) {
      [updatedCourse] = await updatePurchaseDetails(req.user, [course]);
    }
    res.status(200).json({
      course: updatedCourse,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const purchaseCourse = async (req, res) => {
  const { courseId } = req.body;

  try {
    const course = await courseModel.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyPurchased = await purchaseModel.findOne({
      courseId,
      userId: req.user._id,
    });
    if (alreadyPurchased) {
      return res.status(200).json({ message: "Course already purchased" });
    }

    const purchase = new purchaseModel({
      courseId,
      userId: req.user._id,
      price:
        course.discountPrice === 0
          ? course.originalPrice
          : course.discountPrice,
    });
    await purchase.save();

    res.status(201).json({
      message: "Purchase successful",
      purchase,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await purchaseModel.find({ userId: req.user._id });

    if (purchases.length === 0) {
      return res.status(200).json({
        message: "No Purchases available",
        purchases,
      });
    }

    const courseIds = purchases.map((purchase) => purchase.courseId);

    const coursesPurchased = await courseModel.find({
      _id: { $in: courseIds },
    });

    res.status(200).json({
      courses: coursesPurchased,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getCourses,
  findCourses,
  getCourse,
  purchaseCourse,
  getPurchases,
};
