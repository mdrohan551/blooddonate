const express = require('express');
const userControllers = require("../controller/userControllers");
const userFindController = require("../controller/userFindController");
const locationController = require("../controller/locationController");
const ImageUploadController = require("../controller/ImageUploadController");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudUpload = require("../middlewares/CloudMulter");
const postController = require('../controller/PostController');

const router = express.Router();

// ----------------------------------------------------------------//

// Registration API
router.post('/registration', userControllers.register);
// Login API
router.post('/login', userControllers.login);
// Logout API
router.get('/logout', authMiddleware, userControllers.logout);
// User Profile Create API //ProfileMOdel Create Update
router.post('/CreateProfile', authMiddleware, userControllers.CreateProfile);
// User Profile Read API
router.get('/ProfileDetails', authMiddleware, userControllers.ProfileDetails);
// Email Verification code Send API
router.get('/UserOTP/:email', authMiddleware, userControllers.OTPRequest);
// verified code user check API
router.get('/VerifyLogin/:email/:OTP', authMiddleware, userControllers.verified);
//User Profile Update API //UserMOdel update
router.post('/ProfileUpdate', authMiddleware, userControllers.updateUserProfile);
// User Profile Delete API
router.post('/DeleteUser/:id', authMiddleware, userControllers.DeleteUser);
// ----------------------------------------------------------------//

//Find All Users API
router.get('/findByAllUsers', userFindController.findByAllUsers);
//Count Blood Groups Find Users API
router.get('/CountBloodGroupUser', userFindController.CountBloodGroupUser);
//Find By BloodGroup API
router.get('/findByBloodGroup/:bloodGroup', userFindController.findByBloodGroup);
//Find By Division API
router.get('/findByDivision/:Division', userFindController.findByDivision);
//Find By Zila API
router.get('/findByZila/:zila', userFindController.findByZila);
//Find By Upzila API
router.get('/findByUpzila/:upzila', userFindController.findByUpzila);
//Find By Name API
router.get('/findByName/:Keyword', userFindController.findByName);

// ----------------------------------------------------------------//

//get division
router.get('/GetDivisions', locationController.GetDivisionsController);

router.get('/Get', locationController.GetController);
//get zila
router.get('/GetZila/:division', locationController.GetZilaController);
//get upzila
router.get('/GetUpzila/:zila', locationController.GetUpzilaController);

// ----------------------------------------------------------------//
// Image Upload Cloudinary 
router.post("/upload-image",cloudUpload.single("image"),ImageUploadController.uploadCloudinaryController);

// ----------------------------------------------------------------//
//Post Upload 
router.post('/create-post', authMiddleware, postController.createPostControllers);
//read Post
router.get('/read-post/:postId',postController.readPostControllers);
router.get('/get-post-user',authMiddleware,postController.getPostUserControllers);
router.get('/get-post',postController.getPostControllers);

//comment post
router.post('/comment-post/:postId', authMiddleware, postController.commentPostControllers);
// like Post 
router.post('/like-post/:postId', authMiddleware, postController.likePostControllers);




module.exports = router;  // CommonJS ব্যবহার করুন
