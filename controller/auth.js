const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const addUser = async (req, res) => {
  try {
    const { username, password, role } = await req.body;

    const newUser = await User({
      username,
      password,
      role,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ savedUser, message: "new user added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: `server Error: ${error}` });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = await req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "username or password is not correct" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload: typically user ID and role
      process.env.JWT_SECRET, // Your secret key from .env
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Token expiration
    );

    console.log(user, isMatch);

    res.status(200).json({ message: "working", token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { addUser, login };
