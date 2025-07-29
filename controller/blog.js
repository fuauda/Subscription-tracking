const Post = require("../models/Blog");
const User = require("../models/User");

const getBlog = (req, res) => {
    res.send("blog")
}

const postBlog = async (req, res) => {
    try {
        const {title, content, author,} = await req.body;

        const user = User.find({ _id: author })

        if(!user){
            res.status(404).json({ message: "user not found"});
        }



        const newPost = await Post({
            title,
            content,
            author
        })

        const savedPost = await newPost.save()

        res.status(201).json(savedPost);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getBlog, postBlog}