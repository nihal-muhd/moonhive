const express=require('express')
const router=express.Router()
const {adminLogin,addUser,getUser,getGraphData}=require('../controllers/adminControllers')

router.post('/login',adminLogin)
router.post('/add-user',addUser)
router.get('/get-user',getUser)
router.get('/get-graph-data',getGraphData)

module.exports=router