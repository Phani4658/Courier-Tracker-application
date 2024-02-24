const express = require("express");
const router = express.Router();
const Courier = require("../models/courierModel");
const { isAdmin } = require("../authMiddleware");

// Create courier
router.post("/admin/couriers", isAdmin, async (req, res) => {
  try {
    let courierDetails = req.body;
    courierDetails = {
      ...courierDetails,
      trackingHistory: [
        {
          status: courierDetails.status,
          timestamp: new Date(),
          currentLocation: courierDetails.currentLocation,
        },
      ],
    };
    const courier = await Courier.create(courierDetails);
    res.status(201).json(courier);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get all couriers
router.get("/admin/couriers", isAdmin, async (req, res) => {
  try {
    const couriers = await Courier.find();
    res.json(couriers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courier by ID
router.get("/admin/couriers/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const couriers = await Courier.findById(id);
    res.json(couriers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update courier by ID
router.put("/admin/couriers/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, currentLocation, ...otherFields } = req.body;

  try {
    const courier = await Courier.findById(id);

    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }

    // Update other fields
    Object.assign(courier, otherFields);

    // Track changes in status
    if (
      status ||
      (currentLocation &&
        (status !== courier.status ||
          currentLocation != courier.currentLocation))
    ) {
      courier.trackingHistory.push({
        status: courier.status,
        timestamp: new Date(),
        currentLocation: currentLocation,
      });
      courier.status = status;
      courier.currentLocation = currentLocation;
    }

    // Save the updated courier
    await courier.save();

    res.json(courier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete courier by ID
router.delete("/admin/couriers/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Courier.findByIdAndDelete(id);
    res.json({ message: "Courier deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
