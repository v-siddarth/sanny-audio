const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, "sanny");
    req.user = decoded;
    console.log(req.user.userId);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
