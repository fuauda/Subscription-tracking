const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    unique: true, // Titles should ideally be unique or at least unique per author
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [50, 'Content must be at least 50 characters long'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // References the User model
    ref: 'User', // The name of the referenced model
    required: true,
  },
});

// Optional: Add an index for search performance on title/content
// postSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;