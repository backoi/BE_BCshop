const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["news", "policy", "blog", "other"],
      default: "news",
    },
    subContent: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    mainImage: {
      type: String,
    },
    content: [
      {
        id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
//PostSchema.index({ slug: 1 });
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
