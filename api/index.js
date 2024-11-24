const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
app.use(express.json());
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => console.log("Connected to MongoDB.."))
.catch((err) => console.log(err));

app.listen(3000, () => {
    console.log('Server is running on port 3000...')
})