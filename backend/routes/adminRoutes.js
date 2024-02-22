const express = require("express");
const router = express.Router();
const Courier = require("../models/courierModel");
const { isAdmin } = require("../authMiddleware");

// Create courier
router.post("/admin/couriers", isAdmin, async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.status(201).json(courier);
  } catch (error) {
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
  try {
    const updatedCourier = await Courier.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCourier);
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
