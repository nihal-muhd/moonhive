const express=require('express')
const router=express.Router()
const {doLogin,addTask,getTask,deletetask}=require('../controllers/userControllers')

router.post('/login',doLogin)
router.post('/add-task',addTask)
router.get('/get-task',getTask)
router.post('/delete-task',deletetask)

module.exports=router