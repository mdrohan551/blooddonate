const uploadCloudinary = require("../utility/CloudUploadUtility"); // ✅ Proper require

const uploadCloudinaryService = async (req) => {
  try {
    if (!req.file) {
      return {
        status: "fail",
        message: "No Image file provided",
      };
    }

    const upload = await uploadCloudinary(req.file);

    return {
      status: "success",
      message: "Image uploaded successfully",
      data: {
        secure_url: upload.secure_url,
        url: upload.url,
        filename: req.file.originalname,
      },
    };
  } catch (err) {
    return {
      status: "fail",
      message: `Error uploading image: ${err.message}`,
    };
  }
};

module.exports = {
  uploadCloudinaryService,
};
