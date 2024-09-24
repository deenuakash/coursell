const jwt = require("jsonwebtoken");

const adminAuth = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (decoded.role !== "admin") {
      res.status(403).json({
        message: "Forbidden: You do not have the required admin access",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized. Invalid or expired token",
    });
  }
};

module.exports = adminAuth;
