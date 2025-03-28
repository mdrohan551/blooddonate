const express = require('express');
const passport = require('passport');
const userControllers = require("../controller/userControllers");
const userFindController = require("../controller/userFindController");
const locationController = require("../controller/locationController");
const ImageUploadController = require("../controller/ImageUploadController");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudUpload = require("../middlewares/CloudMulter");
const PostController = require('../controller/postController');


const router = express.Router();

// ----------------------------------------------------------------//

// ----------------------------------------------------------------//

// Registration API
router.post('/registration', userControllers.register);
// Login API
router.post('/login', userControllers.login);
// Logout API
router.get('/logout', authMiddleware, userControllers.logout);
// User Profile Create API
router.post('/CreateProfile', authMiddleware, userControllers.CreateProfile);
// User Profile Read API
router.get('/ProfileDetails', authMiddleware, userControllers.ProfileDetails);
// Email Verification code Send API
router.get('/UserOTP/:email', authMiddleware, userControllers.OTPRequest);
// verified code user check API
router.get('/VerifyLogin/:email/:OTP', authMiddleware, userControllers.verified);
//User Profile Update API
router.post('/ProfileUpdate', authMiddleware, userControllers.updateUserProfile);
// User Profile Delete API
router.post('/DeleteUser/:id', authMiddleware, userControllers.DeleteUser);
// ----------------------------------------------------------------//

// Find All Users API
router.get('/findByAllUsers', userFindController.findByAllUsers);
// Count Blood Groups Find Users API
router.get('/CountBloodGroupUser', userFindController.CountBloodGroupUser);
// Find By BloodGroup API
router.get('/findByBloodGroup/:bloodGroup', userFindController.findByBloodGroup);
// Find By Division API
router.get('/findByDivision/:Division', userFindController.findByDivision);
// Find By Zila API
router.get('/findByZila/:zila', userFindController.findByZila);
// Find By Upzila API
router.get('/findByUpzila/:upzila', userFindController.findByUpzila);
// Find By Name API
router.get('/findByName/:Keyword', userFindController.findByName);

// ----------------------------------------------------------------//

// Get division
router.get('/GetDivisions', locationController.GetDivisionsController);
router.get('/Get', locationController.GetController);
// Get zila
router.get('/GetZila/:division', locationController.GetZilaController);
// Get upzila
router.get('/GetUpzila/:zila', locationController.GetUpzilaController);

// ----------------------------------------------------------------//
// Image Upload Cloudinary
router.post("/upload-image", cloudUpload.single("image"), ImageUploadController.uploadCloudinaryController);

// ----------------------------------------------------------------//
// Post Upload
router.post('/create-post', authMiddleware, PostController.createPostControllers);
// Read Post
router.get('/read-post/:postId', PostController.readPostControllers);
router.get('/get-post-user', authMiddleware, PostController.getPostUserControllers);
router.get('/get-post', PostController.getPostControllers);

// Comment post
router.post('/comment-post/:postId', authMiddleware, PostController.commentPostControllers);
// Like Post
router.post('/like-post/:postId', authMiddleware, PostController.likePostControllers);

module.exports = router;  // CommonJS ব্যবহার করুন
