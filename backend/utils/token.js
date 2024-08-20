const jwt = require("jsonwebtoken");

const createNewToken = (payload) => {
  return jwt.sign({ userId: payload }, "sanny", { expiresIn: "10d" });
};

module.exports = { createNewToken };
