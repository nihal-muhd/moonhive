const jwt=require('jsonwebtoken')
const UserModel=require('../models/userModel')
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

const getUser= async(token)=>{
try {
    const jwtToken = jwt.verify(token, process.env.TOKEN_KEY)
    const userId= jwtToken.userId
    const user= await UserModel.find({_id:userId})
    return user
} catch (error) {
    throw(error)
}
}

module.exports.doLogin =async (req, res) => {
    try {
        const maxAge = 60 * 60 * 24;
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email })

        if (user) {
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (passwordCheck) {
                const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
                res.cookie("jwt", token, {
                    withCrdentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                })
                res.status(201).json({ userId: user._id, username: user, status: true })
            } else {
                throw Error("Invalid password")
            }
        } else {
            throw Error("Invalid email")
        }
    } catch (error) {
        throw(error)
    }

}

module.exports.addTask=async(req,res)=>{
    try {
        const data=req.body
        const user= await getUser(req.cookies.jwt)
        const userId=user[0]._id
        await UserModel.updateOne({_id:userId},{
           $push:{
            list:data
           }
        })
        res.status(200).json('task added')
    } catch (error) {
        throw(error)
    }
}

module.exports.getTask=async(req,res)=>{
    try {
        const user= await getUser(req.cookies.jwt)
        const userId=user[0]._id
        const taskList=await UserModel.aggregate([
            {
                $match:{_id:mongoose.mongo.ObjectId(userId)}
            },
            {
                $unwind:'$list'
            },
            {
                $match:{"list.status":'pending'}
            },
            {
                $project:{_id:0,task:'$list.task',task_id:'$list._id',task_status:'$list.status'}
            }
        ])
        console.log(taskList,'task')
        res.status(200).json(taskList)
    } catch (error) {
        throw(error)
    }
}

module.exports.deletetask=async(req,res)=>{
    try {
        const {id}=req.body
        const user= await getUser(req.cookies.jwt)
        const userId=user[0]._id
        await UserModel.updateOne({_id:mongoose.mongo.ObjectId(userId)},{
           $set:{
            status:'ful'
           }
        })
        res.status(200).json('task deleted')
    } catch (error) {
        throw(error)
    }
}