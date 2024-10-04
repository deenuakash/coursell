const jwt = require("jsonwebtoken");

const userOptionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized. Token is invalid",
      });
    }
  } else {
    next();
  }
};

module.exports = userOptionalAuth;
