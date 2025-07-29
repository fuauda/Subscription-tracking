const Post = require("../models/Blog");

const getBlog = (req, res) => {
    res.send("blog")
}

const postBlog = async (req, res) => {
    try {
        const {title, content} = await req.body;

        

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