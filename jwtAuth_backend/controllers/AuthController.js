const User = require('../models/UserModel')
const {createToken} = require('../util/SecretToken')
const bcrypt = require('bcryptjs')

module.exports.signUp = async (req,res)=>{
    try {
        const {email,userName,password,createdAt} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({message:'User already exists'})
        }
        const user = await User.create({
            email,
            userName,
            password,
            createdAt
        })
        
        const token = await createToken(user._id)
        res.cookie('token',token,{
            withCredentials:true,
            httpOnly:false
        })
        res.status(200).json({message:'User signed in successfully',success:true,user})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Sign up failed'})
    }
}

module.exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.json({message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({message:"incorrect password or email"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password or email" });
        }
        const token = await createToken(user._id)
        res.cookie('token',token,{
            withCredentials: true,
            httpOnly: false
        })
        res.status(201).json({message:"User logged in successfully",success:true})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Sign in failed'})
    }
}
