const express = require("express");
const { createUser, loginUser } = require("../controllers/auth.controller");

const route = express.Router();

route.post("/register", createUser);
route.post("/login", loginUser);

module.exports = route;
