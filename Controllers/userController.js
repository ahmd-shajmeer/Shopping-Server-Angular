const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

// Register
exports.register = async (req,res) =>{
    const { username,email,password } = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exist...Please Login")
        }else{
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// Login
exports.login = async (req,res) =>{
    const { email,password } = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.secretKey)
            res.status(200).json({token,existingUser})
        }else{
            res.status(404).json("Your not a registered User/ Incorrect Credentials")
        }
    }catch(err){
        res.status(401).json(err)
    }
}
