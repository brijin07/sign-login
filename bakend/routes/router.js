const express=require('express')

const usercontroll = require('../controller/usercontroll')

const router=new express.Router()


router.post('/signup',usercontroll.signUser);
router.post('/login',usercontroll.login);
router.post('/verify-otp',usercontroll.verifyOTP);






module.exports=router;

