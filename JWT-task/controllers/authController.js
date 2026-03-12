const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = async (req,res) => {

    const { full_name, email, password } = req.body

    if(!full_name || !email || !password){
        return res.status(400).json({message:"All fields required"})
    }

    if(password.length < 8){
        return res.status(400).json({message:"Password must be at least 8 characters"})
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({message:"Email already exists"})
    }

    const user = await User.create({
        full_name,
        email,
        password
    })

    const userResponse = {
        id:user._id,
        full_name:user.full_name,
        email:user.email
    }

    res.status(201).json(userResponse)
}


exports.login = async (req,res) => {

    const { email, password } = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"})
    }

    const token = jwt.sign(
        { id:user._id },
        process.env.JWT_SECRET,
        { expiresIn:process.env.JWT_EXPIRES_IN }
    )

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:3600000
    })

    res.json({message:"Login successful"})
}


exports.dashboard = (req,res) => {

    res.json({
        message:"Welcome to dashboard",
        user:req.user
    })
}


exports.logout = (req,res)=>{
    res.clearCookie("token")
    res.json({message:"Logged out"})
}