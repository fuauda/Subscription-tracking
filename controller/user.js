const User = require("../models/User");


const test = async (req, res) => {
    res.send("hello world");
}

const addUser = async (req, res) => {
    try{
        const {username, password, role} = await req.body;


        const newUser = await User({
            username,
            password,
            role
        })

        const savedUser = await newUser.save()

        res.status(201).json({ savedUser, message: "new user added successfully" })
    }catch(error) {
        console.log(error)
        res.status(500).json({ error, message: `server Error: ${error}`,})
    }
}

module.exports = { addUser, test }