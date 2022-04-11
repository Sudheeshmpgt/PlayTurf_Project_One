const route=require('express').Router();
const controller=require('../controller/controller')

//routes
route.get('/',controller.home)

//user registration
route.post('/user_registration',controller.registration)

module.exports=route;
