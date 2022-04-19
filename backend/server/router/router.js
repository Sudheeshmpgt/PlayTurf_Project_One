const route=require('express').Router();
const controller=require('../controller/controller')

//routes
route.get('/',controller.home)

//user registration
route.post('/user_registration',controller.registration)

//user login
route.post('/user_signin',controller.login)

//admin login
route.post('/admin_login',controller.adminLogin)

//admin user management
route.get('/admin_panel/user_management', controller.userManagement)

//admin user management update request
route.get('/admin_panel/user_management/update/:id', controller.getUserData)

//admin user management get update
route.put('/admin_panel/user_management/edit_user/:id', controller.updateUserData)

//admin user management update user status
route.put('/admin_panel/user_management/edit_user_status/:id', controller.updateUserStatus)

//admin user management delete user
route.delete('/admin_panel/user_management/delete_user/:id', controller.deleteUserData)

//admin turf management
route.get('/admin_panel/turfs', controller.turfManagement)

//admin turf management add new turf
route.post('/admin_panel/turfs/add_turfs', controller.addTurf)

//admin turf management update request
route.get('/admin_panel/turfs/edit_turfs/:id', controller.getTurfData)

//admin turf management get updated
route.put('/admin_panel/turfs/edit_turfs/:id', controller.updateTurfData)

//admin turf management delete turf details
route.delete('/admin_panel/turfs/delete_turfs/:id', controller.deleteTurfData)

//admin category management
route.get('/admin_panel/category', controller.categoryManagement)

//admin category management add new category
route.post('/admin_panel/category/add_category', controller.addCategory)

//admin turf management update request
route.get('/admin_panel/category/edit_category/:id', controller.getCategoryData)

//admin turf management get updated
route.put('/admin_panel/category/edit_category/:id', controller.updateCategoryData)

//admin turf management delete turf details
route.delete('/admin_panel/category/delete_category/:id', controller.deleteCategoryData)


module.exports=route;
