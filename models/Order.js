const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shipAddress: {
      fullName: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    shipOption: {
      type: String,
      enum: ["express", "fast", "standard"],
      default: "standard",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipping", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "vnpay", "bank_transfer"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
OrderSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);
