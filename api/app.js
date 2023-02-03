const express=require('express')
const dotenv=require('dotenv').config({path:'./.env'})
const cors=require('cors')
const cookieParser = require('cookie-parser')
const connectDB=require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const app=express()
connectDB()

const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin')

const port=process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}))
app.use(cookieParser())

app.use('/',userRouter)
app.use('/admin',adminRouter)


app.use(errorHandler)

app.listen(port,()=>console.log(`server is connected to port ${port}`))