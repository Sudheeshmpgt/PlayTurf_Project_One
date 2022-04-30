const route = require('express').Router();
const controller = require('../controller/controller')
const config = require('../../config')
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require('cloudinary').v2
const multer = require("multer");
const verifyAuth = require('../middleware/authenticate')

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
  secure: true
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/uploads",
  },
});

const upload = multer({ storage: storage });


//routes
route.get('/', controller.home)

//user registration
route.post('/user_registration', controller.registration)

//user login
route.post('/user_signin', controller.login)

//user google login
route.post('/googlelogin', controller.googleLogin)

//admin login
route.post('/admin_login', controller.adminLogin)

//admin user management
route.get('/admin_panel/user_management', verifyAuth, controller.userManagement)

//admin user management update request
route.get('/admin_panel/user_management/update/:id', verifyAuth, controller.getUserData)

//admin user management get update
route.put('/admin_panel/user_management/edit_user/:id', upload.single("picture"), verifyAuth, controller.updateUserData)

//admin user management update user status
route.put('/admin_panel/user_management/edit_user_status/:id', verifyAuth, controller.updateUserStatus)

//admin user management delete user
route.delete('/admin_panel/user_management/delete_user/:id', verifyAuth, controller.deleteUserData)

//admin turf management
route.get('/admin_panel/turfs', controller.turfManagement)

//admin turf management add new turf
route.post('/admin_panel/turfs/add_turfs', upload.array("pictures"), verifyAuth, controller.addTurf)

//admin turf management update request
route.get('/admin_panel/turfs/edit_turfs/:id', verifyAuth, controller.getTurfData)

//admin turf management get updated
route.put('/admin_panel/turfs/edit_turfs/:id', upload.single("picture"), verifyAuth, controller.updateTurfData)

//admin turf management delete turf details
route.delete('/admin_panel/turfs/delete_turfs/:id', verifyAuth, controller.deleteTurfData)

//admin category management
route.get('/admin_panel/category', verifyAuth, controller.categoryManagement)

//admin category management add new category
route.post('/admin_panel/category/add_category', verifyAuth, controller.addCategory)

//admin turf management update request
route.get('/admin_panel/category/edit_category/:id', verifyAuth, controller.getCategoryData)

//admin turf management get updated
route.put('/admin_panel/category/edit_category/:id', verifyAuth, controller.updateCategoryData)

//admin turf management delete turf details
route.delete('/admin_panel/category/delete_category/:id', verifyAuth, controller.deleteCategoryData)

//admin banner management
route.get('/admin_panel/banner', controller.bannerManagement)

//admin banner management add new banner
route.post('/admin_panel/banner/add_banner', upload.single("picture"), verifyAuth, controller.addBanner)

//admin banner management update request
route.get('/admin_panel/banner/edit_banner/:id', verifyAuth, controller.getBannerData)

//admin banner management get updated
route.put('/admin_panel/banner/edit_banner/:id', upload.single("picture"), verifyAuth, controller.updateBannerData)

//admin banner management delete banner details
route.delete('/admin_panel/banner/delete_banner/:id', verifyAuth, controller.deleteBannerData)

//admin-user booking management
route.post('/admin_panel/booking/add_booking', verifyAuth, controller.addBooking)

//user booking check
route.post('/admin_panel/booking/check', verifyAuth, controller.checkBooking)

//user booking details request
route.get('/booking_details/:id', verifyAuth, controller.getBookingDetails)


module.exports = route;
