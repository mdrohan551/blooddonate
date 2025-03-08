const cloudinary = require("cloudinary").v2;
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
} = require("../config/config.js");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
});

const uploadCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "BloodDonation" }, (error, uploadResult) => {
        if (error) reject(error);
        else resolve(uploadResult);
      })
      .end(buffer);
  });

  return uploadImage;
};

// ✅ CommonJS format (require/module.exports)
module.exports = uploadCloudinary;
