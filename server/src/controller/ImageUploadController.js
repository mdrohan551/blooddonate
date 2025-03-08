const {
  uploadCloudinaryService,
} = require("../services/ImageUploadService.js");

// Use Cloudinary Random File Upload Controller
exports.uploadCloudinaryController = async (req, res) => {
  let result = await uploadCloudinaryService(req);
  return res.status(200).json(result);
};
