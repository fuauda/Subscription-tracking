const connectDB = require("../config/db");
const User = require("../models/User");


const test = async (req, res) => {
    res.send("hello world");
}

const addUser = async (req, res) => {
    try{
        await connectDB();

        const { username, password } = await req.body();

        const newUser = await User({
            username,
            password
        })

        const savedUser = await newUser.save()

        res.status(201).json({ savedUser, message: "new user added successfully" })
    }catch(error) {
        console.log(error)
        res.status(500).json({ error, message: `server Error: ${error}`,})
    }
}

module.exports = { addUser, test }