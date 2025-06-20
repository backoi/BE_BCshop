const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    address: [
      {
        type: {
          type: String,
          enum: ["home", "work", "other"],
        },
        city: {
          type: String,
        },
        district: {
          type: String,
        },
        ward: {
          type: String,
        },
        street: {
          type: String,
        },
        phone: {
          type: String,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    // role: {
    //     type: String,
    //     required: true,
    // },
    // status: {
    //     type: String,
    //     required: true,
    // },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
