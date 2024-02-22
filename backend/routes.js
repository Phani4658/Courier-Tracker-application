const express = require('express');
const router = express.Router();
const User = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Courier = require('./models/courierModel');
const { isAdmin } = require('./authMiddleware');


router.get('/', (req, res) => {
  res.send("Hello World!");
});

router.post('/register', async (req, res) => {
  const { username, password, name, role } = req.body;
  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      username,
      name,
      password,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, "SECRET");

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log(user.role);

    const isAdmin = user.role === "admin";
    if(!isAdmin){
      return res.status(401).json({message: "Admin Rights Required"})
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username, role: user.role }, "SECRET");

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new courier
router.post('/couriers', isAdmin, async (req, res) => {
    try {
        const courier = await Courier.create(req.body);
        res.status(201).json(courier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all couriers
router.get('/couriers', isAdmin, async (req, res) => {
    try {
        const couriers = await Courier.find();
        res.json(couriers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a courier by ID
router.put('/couriers/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCourier = await Courier.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedCourier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a courier by ID
router.delete('/couriers/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Courier.findByIdAndDelete(id);
        res.json({ message: 'Courier deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;



module.exports = router;
