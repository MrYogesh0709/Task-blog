const bcryptjs = require("bcryptjs");

const hashPassword = async (password) => {
  return await bcryptjs.hash(password, 10);
};

const comparePass = async (password, hashPass) => {
  return await bcryptjs.compare(password, hashPass);
};

module.exports = { hashPassword, comparePass };
