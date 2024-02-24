const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema({
  courierName: {
    type: String,
    required: true,
  },
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: [
      "Order Placed",
      "Order Packed",
      "Shipped",
      "In Transit",
      "Out for Delivery",
      "Delivered",
    ],
    default: "Order Placed",
  },
  fromAddress: {
    type: String,
    required: true,
  },
  toAddress: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  estimatedDeliveryDate: {
    type: Date,
    default: Date.now,
  },
  trackingHistory: [
    {
      status: String,
      currentLocation: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      modifiedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Courier = mongoose.model("Courier", courierSchema);

module.exports = Courier;
