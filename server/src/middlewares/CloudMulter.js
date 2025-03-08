const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const cloudUpload = multer({ storage: memoryStorage });

module.exports = cloudUpload;
