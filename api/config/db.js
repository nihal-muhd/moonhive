const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect('mongodb://localhost:27017/moonhive')
        console.log('Database connected succesfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB