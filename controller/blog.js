const connectDB = require("../config/db");
const Post = require("../models/Blog");

const getBlog = (req, res) => {
    res.send("blog")
}

const postBlog = async (req, res) => {
    try {
        await connectDB();

        const {title, content} = req.body;

        const newPost = await Post({
            title,
            content
        })

        const savedPost = await newPost.save()

        res.status(201).json(savedPost);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getBlog, postBlog}