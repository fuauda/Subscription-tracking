const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'], // Required with custom error message
    unique: true, // Ensures username is unique across all users
    trim: true,   // Removes leading/trailing whitespace
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true, // Stores emails in lowercase for consistency
//     match: [/.+@.+\..+/, 'Please enter a valid email address'], // Simple regex for email validation
//   },
  password: { // Store hashed passwords only!
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    // select: false,
  },
  role: { // Example for basic access control (e.g., 'user', 'admin')
    type: String,
    enum: ['user', 'admin'], // Restricts values to either 'user' or 'admin'
    default: 'user',
  },
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Mongoose pre-save hook: Hash password before saving the user document
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a salt (recommended: 10 to 12 rounds for good balance of security and performance)
  const salt = await bcrypt.genSalt(10); // 10 is the default work factor

  // Hash the password with the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Continue with the save operation
});


const User = mongoose.model('User', userSchema);

module.exports = User;