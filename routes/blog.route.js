const express = require("express");
const {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const route = express.Router();

route.post("/create", authMiddleware, createBlog);
route.get("/all", authMiddleware, getAllBlogs);
route.get("/:blogId", authMiddleware, getBlog);

route.patch("/:blogId", authMiddleware, updateBlog); //update blog
route.delete("/:blogId", authMiddleware, deleteBlog); //delete blog

module.exports = route;
