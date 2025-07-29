const express= require("express");
const blogRouter = require("./routes/blogRoute");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute")
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000; // Define PORT with a default value



connectDB();

app.use(express.json());

app.use('/auth', authRouter)
app.use('/blog', blogRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Insa Summer CAMP!');
});

// Bind the port to the app
app.listen(PORT, () => {
    console.log(`OUR SURVER  is running on http://localhost:${PORT}`);
});
