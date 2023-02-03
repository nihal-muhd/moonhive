const jwt=require('jsonwebtoken')
const UserModel=require('../models/userModel')
const bcrypt = require('bcrypt')

const adminDetails={
    usernmae:process.env.ADMIN_USERNAME,
    password:process.env.ADMIN_PASSWORD
}

module.exports.adminLogin=async(req,res)=>{
    try {
        console.log(req.body,'hey')
        const {username,password}=req.body
        const maxAge=60 * 60 * 24
        if(username === adminDetails.usernmae && password === adminDetails.password){
            const adminToken=jwt.sign({adminId:username},process.env.TOKEN_KEY,{expiresIn:maxAge})
            res.cookie('adminjwt',adminToken,{
                withCrdentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            })
            res.status(201).json({ adminId: username, status: true })
        }else{
            console.log('login failed')
        }
    } catch (error) {
     console.log(error)   
    }
}

module.exports.addUser=async(req,res)=>{
    try {
        const data=req.body
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        await UserModel.create(data)
        res.status(201).json({status:'user added'})
    } catch (error) {
        throw(error)
    }
}

module.exports.getUser=async(req,res)=>{
    try {
        const data=await UserModel.find().lean()
        res.status(200).json({status:true,data})
    } catch (error) {
        throw(error)
    }
}

module.exports.getGraphData=async(req,res)=>{
    try {
        const data=await UserModel.aggregate([
            {
                $project:{ name:1,numberoftask:{$size:'$list'}}
            }
        ])
        console.log(data,'graph data')
        res.status(200).json(data)
    } catch (error) {
        throw(error)
    }
}
