const multer = require("multer");
const config = require('../../config')
const route = require('express').Router();
const cloudinary = require('cloudinary').v2
const verifyAuth = require('../middleware/authenticate')
const userController = require('../controller/userController')
const adminController = require('../controller/adminController')
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const turfController = require('../controller/turfManageController')
const razorpayController = require('../controller/razorpayController')
const offerController = require('../controller/offerManageController')
const bannerController = require('../controller/bannerManageController')
const bookingController = require('../controller/bookingManageController')
const favouritesController = require('../controller/favouritesController')
const userManageController = require('../controller/userManageController')
const categoryController = require('../controller/categoryManageController')
const googleLoginController = require('../controller/googleLoginController');
const couponController = require('../controller/couponController')

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

//user registration
route.post('/user_registration', userController.registration)

//user login
route.post('/user_signin', userController.login)

//user google login
route.post('/googlelogin', googleLoginController.googleLogin)

//admin login
route.post('/admin_login', adminController.adminLogin)

//admin user management
route.get('/admin_panel/user_management', verifyAuth, userManageController.userManagement)

//admin user management update request
route.get('/admin_panel/user_management/update/:id', verifyAuth, userManageController.getUserData)

//admin user management get update
route.put('/admin_panel/user_management/edit_user/:id', upload.single("picture"), verifyAuth, userManageController.updateUserData)

//admin user management update user status
route.put('/admin_panel/user_management/edit_user_status/:id', userManageController.updateUserStatus)

//admin user management delete user
route.delete('/admin_panel/user_management/delete_user/:id', verifyAuth, userManageController.deleteUserData)

//admin turf management
route.get('/admin_panel/turfs', turfController.turfManagement)

//admin turf management add new turf
route.post('/admin_panel/turfs/add_turfs', upload.array("pictures"), verifyAuth, turfController.addTurf)

//admin turf management update request
route.get('/admin_panel/turfs/edit_turfs/:id', verifyAuth, turfController.getTurfData)

//admin turf management get updated
route.put('/admin_panel/turfs/edit_turfs/:id', upload.single("picture"), verifyAuth, turfController.updateTurfData)
 
//admin turf management delete turf details
route.delete('/admin_panel/turfs/delete_turfs/:id', verifyAuth, turfController.deleteTurfData)
 
//admin category management
route.get('/admin_panel/category', categoryController.categoryManagement)  

//admin category management add new category
route.post('/admin_panel/category/add_category', verifyAuth, categoryController.addCategory)

//admin turf management update request
route.get('/admin_panel/category/edit_category/:id', verifyAuth, categoryController.getCategoryData)

//admin turf management get updated
route.put('/admin_panel/category/edit_category/:id', verifyAuth, categoryController.updateCategoryData)

//admin turf management delete turf details
route.delete('/admin_panel/category/delete_category/:id', verifyAuth, categoryController.deleteCategoryData)

//admin banner management
route.get('/admin_panel/banner', bannerController.bannerManagement)

//admin banner management add new banner
route.post('/admin_panel/banner/add_banner', upload.single("picture"), verifyAuth, bannerController.addBanner)

//admin banner management update request
route.get('/admin_panel/banner/edit_banner/:id', verifyAuth, bannerController.getBannerData)

//admin banner management get updated
route.put('/admin_panel/banner/edit_banner/:id', upload.single("picture"), verifyAuth, bannerController.updateBannerData)

//admin banner management delete banner details
route.delete('/admin_panel/banner/delete_banner/:id', verifyAuth, bannerController.deleteBannerData)

//admin-user booking management
route.post('/admin_panel/booking/add_booking', verifyAuth, bookingController.addBooking)

//user booking check
route.get('/admin_panel/booking/check/', verifyAuth, userController.checkBooking)

//user booking details request
route.get('/booking_details/:id', verifyAuth, bookingController.getBookingDetails)

//admin booking management
route.get('/admin_panel/booking', verifyAuth, bookingController.bookingManagement) 

//admin booking management status update
route.put('/admin_panel/booking_management/edit_status/:id', verifyAuth, bookingController.changeBookingStatus) 

//admin booking management delete booking details
route.delete('/admin_panel/booking_management/delete_booking/:id', verifyAuth, bookingController.deleteBookingData)

//admin booking management cancel booking details
route.put('/booking/edit_status/:id', verifyAuth, bookingController.cancelBooking)

//user add to favourites
route.post('/addfavourites', verifyAuth, favouritesController.addToFavourites)

//user favourites get request
route.get('/get_favourites/:id', verifyAuth, favouritesController.getFavourites)

//razorpay get key
route.get('/get_key', verifyAuth, razorpayController.getRazorpayKey)

//razorpay create order
route.post('/create_order', verifyAuth, razorpayController.createOrder)

//razorpay pay order
route.post('/pay_order', verifyAuth, razorpayController.payOrder)

//razoypay list orders
route.get('/list_orders', verifyAuth, razorpayController.listOrder)

//admin offer management
route.post('/admin_panel/offer/add_offer', verifyAuth, offerController.addOffer) 

//admin offer management 
route.get('/admin_panel/offers', offerController.offerManagement)

//admin offer status edit
route.put('/admin_panel/offers/:id', offerController.offerStatus)

//admin offer edit get request
route.get('/admin_panel/offers/edit_offers/:id', verifyAuth, offerController.getOfferData)

//admin offer details get updated
route.put('/admin_panel/offers/edit_offers/:id', verifyAuth, offerController.updateOfferData)

//admin offer delete offer details
route.delete('/admin_panel/offers/delete_offers/:id', verifyAuth, offerController.deleteOfferData)

//user get request for turf offer 
route.get('/user/offers/edit_offers/:id', verifyAuth, offerController.getOfferTurfData)

//user password change
route.put('/user/update_data', verifyAuth, userController.changePassword)

//user get request of booking data
route.get('/user/get_data/:id', verifyAuth, bookingController.getBookingData)

//admin_panel add coupon details
route.post('/admin_panel/coupon/add_coupon', verifyAuth, couponController.addCoupon)

//admin_panel coupon managemnt
route.get('/admin_panel/coupon', verifyAuth, couponController.couponManagement)

//admin_panel coupon managemnt update get request
route.get('/admin_panel/coupon/edit_coupon/:id', verifyAuth, couponController.getCouponData)

//admin_panel coupon managemnt get updated
route.put('/admin_panel/coupon/edit_coupon/:id', verifyAuth, couponController.updateCouponData)

//admin_panel coupon managemnt update status
route.put('/admin_panel/coupon/edit_status/:id', couponController.couponStatus)

//admin_panel coupon managemnt delete request
route.delete('/admin_panel/coupon/delete_coupon/:id', verifyAuth, couponController.deleteCouponData)

//check user Coupon exists
route.get('/user/check_coupon', verifyAuth,couponController.checkCoupon)

//verify user for coupon application
route.get('/user/coupon/verify_user', verifyAuth, couponController.couponVerification)

//check for first offer
route.get('/user/check_first_offer', verifyAuth, bookingController.verifyFirstOffer)


module.exports = route;
