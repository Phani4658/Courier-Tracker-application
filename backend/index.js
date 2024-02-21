const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// routes

app.get('/', (req,res) => {
    res.send("Hello World!")
})


app.post('/register',async(req,res) => {
    const {username, password, name} = req.body;
    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 5);

        // Create a new user
        const newUser = new User({
            username,
            name,
            password,
        });

        await newUser.save();


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

app.post('/login',async(req,res) => {
    const { username, password } = req.body;


    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        console.log(user.password);
        console.log(user,username,password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }



        // Compare the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.username, role: user.role }, "SECRET");

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



mongoose.connect("mongodb+srv://Phani:Phani3385@cluster0.kzblpva.mongodb.net/test?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to Mongo DB");
    app.listen(3015, () => {
        console.log("Node API app is running on port 3015")
    })
}).catch((err) => {
    console.log(err);
});