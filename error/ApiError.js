module.exports.errorHandler = (err, req, res, next) => {
  console.log(err, "error");
  return res.status(err.code || 500).json({ message: err.message || "Internal server Error" });
};
