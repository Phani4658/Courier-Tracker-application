const express = require("express");
const router = express.Router();
const Courier = require("../models/courierModel");

// Get courier by tracking number
router.get("/couriers/:trackingNumber", async (req, res) => {
  const { trackingNumber } = req.params;
  try {
    const courierDetails = await Courier.findOne({ trackingNumber });
    res.json(courierDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
