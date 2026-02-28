const Blog = require("../models/blog.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { isOwner } = require("../utils/isOwner.util");

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  const { userId } = req.user;
  if (!title || !content) {
    return res.status(400).json({ message: "title and content are required" });
  }
  const blog = await Blog.create({ title, content, owner: userId, tags });
  res.status(201).json({ blog, message: "Blog created" });
});

const getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json(blog);
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const search = req.query.search || "";

  const skip = (page - 1) * limit;

  const blogs = await Blog.find({ title: { $regex: search, $options: "i" } })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const blogsSize = blogs.length;

  res.json({ blogs, blogsSize });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.user;
  const { title, content, tags } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const canUpdate = isOwner(userId, blog.owner);

  if (!canUpdate) {
    return res.status(403).json({ message: "user is not authorized" });
  }

  if (title !== undefined) blog.title = title;
  if (content !== undefined) blog.content = content;
  if (tags !== undefined) blog.tags = tags;

  await blog.save();

  res.json({ message: "Blog Updated" });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.user;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const canDelete = isOwner(userId, blog.owner);

  if (!canDelete) {
    return res.status(403).json({ message: "user is not authorized" });
  }

  await Blog.findByIdAndDelete(blogId);
  res.json({ message: "Blog deleted" });
});

module.exports = { createBlog, getBlog, getAllBlogs, updateBlog, deleteBlog };
