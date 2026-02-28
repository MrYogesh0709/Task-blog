const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = require("../config/env.config");

const createAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, ACCESS_TOKEN, { expiresIn: "12h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN);
};

module.exports = { createAccessToken, verifyToken };
