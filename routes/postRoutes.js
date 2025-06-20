const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
//get all post
router.get("/", async (req, res) => {
  const posts = await Post.find({ type: "blog" }).sort({ createdAt: -1 });
  res.json(posts);
});
//get post by slug
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    //console.log("post", post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//get all post by type
router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { page, limit } = req.query;
    //console.log("type", type);
    //console.log("page", page);

    const posts = await Post.find({ type })
      .skip((page - 1) * limit)
      .limit(limit);
    //console.log("posts", posts);
    const total = await Post.countDocuments({ type });
    const pageCount = Math.ceil(total / limit);
    res.json({ posts, pageCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
