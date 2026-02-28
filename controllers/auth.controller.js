const User = require("../models/user.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { hashPassword, comparePass } = require("../utils/password.util");
const { createAccessToken } = require("../utils/token.utils");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name,email & pass are required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const hashPass = await hashPassword(password);
  const user = await User.create({ name, email, password: hashPass });
  res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email & password are required" });
  }

  const userExists = await User.findOne({ email }).select("+password");
  if (!userExists) {
    return res.status(400).json({ message: "Email or password is wrong" });
  }
  const hashPass = userExists.password;
  const isPassCorrect = await comparePass(password, hashPass);
  if (!isPassCorrect) {
    return res.status(400).json({ message: "Email or password is wrong" });
  }
  const accessToken = createAccessToken(userExists);

  res.json({
    name: userExists.name,
    email: userExists.email,
    accessToken,
    message: `Welcome ${userExists.name}`,
  });
});

module.exports = { createUser, loginUser };
