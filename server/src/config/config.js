const dotenv = require("dotenv");

// কনফিগ ফাইল লোড করা
dotenv.config({ path: "./config.env" });

module.exports.PORT = process.env.PORT || 2020;
module.exports.DATABASE_URL = process.env.DB;
module.exports.USER = process.env.USER;
module.exports.PASS = process.env.PASS;
module.exports.JWT_KEY = process.env.JWT;
module.exports.JWT_EXPIRE_TIME = 30 * 24 * 60 * 60;

//Email Credentials Rohan
module.exports.EMAIL_HOST = "smtp.gmail.com"; // ✅ ঠিক করা হয়েছে
module.exports.EMAIL_PORT = 587; // ✅ TLS এর জন্য সঠিক পোর্ট
module.exports.EMAIL_SECURITY = false; // ✅ TLS হলে false হবে
module.exports.EMAIL_USER = "armanhossain0175019@gmail.com";
module.exports.EMAIL_PASSWORD = "clwe spne uqjd qgtl"; // ✅ সাধারণ পাসওয়ার্ড ব্যবহার করা যাবে না
module.exports.EMAIL_UN_AUTH = true;

//Email Credentials Azim
// module.exports.EMAIL_HOST = 'sandbox.smtp.mailtrap.io';
// module.exports.EMAIL_PORT = 2525;
// module.exports.EMAIL_SECURITY = false;
// module.exports.EMAIL_USER = "ffd3655ea4cb6f";
// module.exports.EMAIL_PASSWORD = '9eec6de13aba90';
// module.exports.EMAIL_UN_AUTH = true;

//  Cloudinary file
module.exports.CLOUDINARY_CLOUD_NAME = "dj0rzds3e";
module.exports.CLOUDINARY_API_KEY = "564852993563455";
module.exports.CLOUDINARY_API_SECRET_KEY = "1dsxDGAdErTHzWHYsRRfY2DphwI";

module.exports.WEB_CACHE = false;
module.exports.MAX_JSON_SIZE = "10MB";
module.exports.URL_ENCODE = true;

module.exports.REQUEST_TIME = 20 * 60 * 1000;
module.exports.REQUEST_NUMBER = 2000;
