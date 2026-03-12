const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api",authRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})