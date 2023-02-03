const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    list:[]
},
{
    timestamps:true
})

const UserModel=mongoose.model('user',userSchema)
module.exports=UserModel