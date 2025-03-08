const userModel = require("../models/userModels");
const profileModel = require("../models/profileModel");
const bcryptjs = require("bcryptjs");
const { TokenEncode } = require("../utility/tokenHelper");
const EmailSend = require("../utility/EmailHelper");
const mongoose = require("mongoose");

const registrationServices = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      Gender,
      DateOfBirth,
      NIDNumber,
      phoneNumber,
      password,
      bloodGroup,
    } = req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !Gender ||
      !DateOfBirth ||
      !NIDNumber ||
      !phoneNumber ||
      !password ||
      !bloodGroup
    ) {
      return { status: "fail", message: "All fields are required" };
    }

    // Check if the Gender value is valid
    if (!["Male", "Female"].includes(Gender)) {
      return {
        status: "fail",
        message: "Invalid Gender value. Must be 'Male' or 'Female'",
      };
    }

    phoneNumber = phoneNumber.trim(); // Remove extra spaces

    const ExistingUser = await userModel.findOne({
      phoneNumber: phoneNumber,
      NIDNumber: NIDNumber,
    });
    if (ExistingUser) {
      return { status: "fail", message: "User already exists" };
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Generate a random OTP
    let random = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number

    // Generate a unique email by combining the first name and random code

    let generatedEmail = `${bloodGroup.toLowerCase()}${random}@notfound.com`;

    // create new user
    // Create a new user
    await userModel.create({
      firstName,
      lastName,
      Gender,
      DateOfBirth,
      NIDNumber,
      phoneNumber,
      password: hashPassword,
      bloodGroup,
      verify: false,
      Email: generatedEmail,
      otp: random,

      // why random use akhane defoult faka string mongos same valu dhore ney tay error dey
    });
    return {
      status: "success",
      message: "User Successfully Registered But You Are Not Verify!",
    };
  } catch (e) {
    if (e.code === 11000) {
      return {
        status: "fail",
        message: "User already exists",
      };
    }
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err) => err.message);
      return { status: "fail", message: errors.join(", ") };
    }
    // Proper error response with res.status().send()
    return { status: "fail", message: `Unable to register user: ${e.message}` };
  }
};

const loginServices = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Check if phone number and password are provided
    if (!phoneNumber || !password) {
      return {
        status: "fail",
        message: "Phone number and password are required",
      };
    }

    let data = await userModel.findOne({ phoneNumber: phoneNumber });
    if (data === null) {
      return { status: "fail", message: "User not found" };
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcryptjs.compare(password, data.password);
    if (!isPasswordValid) {
      return { status: "fail", message: "Incorrect password" };
    } else {
      // token encode
      let token = TokenEncode(data["phoneNumber"], data["_id"]);
      return { status: "success", message: "Successfully login", token: token };
    }
  } catch (err) {
    return { status: "fail", message: `Unable to login user${err}` };
  }
};

const SaveProfileService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;

    // Destructure data from request body
    const {
      location,
      Weight,
      HealthConditions,
      lastDonationTime,
      DonationChek,
    } = req.body;

    // Check for required fields
    if (
      !location ||
      !location.Division ||
      !location.zila ||
      !location.upzila ||
      !location.CurrentAddress
    ) {
      return {
        status: "fail",
        message: "All required fields must be provided",
      };
    }

    // Check if the user exists
    const userExists = await userModel.findById(user_id);
    if (!userExists) {
      return { status: "fail", message: "User not found" };
    }

    // Create and save the profile
    const profileDataPayload = {
      UserID: user_id,
      location: {
        Division: location.Division,
        zila: location.zila,
        upzila: location.upzila,
        CurrentAddress: location.CurrentAddress,
      },
      Weight: Weight || null,
      HealthConditions: HealthConditions || null,
      lastDonationTime: lastDonationTime || null,
      DonationChek: DonationChek,
    };

    const newProfile = await profileModel.findOneAndUpdate(
      { UserID: user_id }, // Filter condition
      profileDataPayload, // Data to insert or update
      { upsert: true, new: true } // Create if not exists, return the new document
    );

    // Return success response
    return {
      status: "success",
      message: "Profile saved successfully",
      data: newProfile,
    };
  } catch (err) {
    // Handle unexpected errors
    return {
      status: "fail",
      message: `Unable to save profile: ${err.message}`,
    };
  }
};

const ProfileDetailsReadServices = async (req, res) => {
  try {
    let user_id = req.headers.user_id;

    let matchStage = { $match: { _id: new mongoose.Types.ObjectId(user_id) } };
    let JoinWithProfileStage = {
      $lookup: {
        from: "profiles", // The collection name of profileModel
        localField: "_id", // Field in userModel
        foreignField: "UserID", // Field in profileModel
        as: "profile", // Alias for the combined data
      },
    };
    let UnwindStage = {
      $unwind: { path: "$profile", preserveNullAndEmptyArrays: true },
    };
    let ProjectionStage = {
      $project: {
        password: 0,
        otp: 0,
        createdAt: 0,
        updatedAt: 0,
        "profile._id": 0,
        "profile.UserID": 0,
        "profile.createdAt": 0,
        "profile.updatedAt": 0,
      },
    };

    let data = await userModel.aggregate([
      matchStage,
      JoinWithProfileStage,
      UnwindStage,
      ProjectionStage,
    ]);

    if (!data.length) {
      return {
        status: "fail",
        message: "User not found or profile data is unavailable",
      };
    }

    return { status: "success", data: data[0] };
  } catch (err) {
    return {
      status: "fail",
      message: `Error fetching user and profile details: ${err.message}`,
    };
  }
};

const GetEmail = async (req, res) => {
  try {
    let email = req.params.email;
    let userId = req.headers.user_id;
    if (email) {
      let user = await userModel.findOne({ Email: email });
      if (user) {
        return { status: "fail", message: "Email already exists" };
      }
      let code = Math.floor(100000 + Math.random() * 900000);
      let EmailText = `your verification code is ${code}`;
      let EmailSubject = "Email Verification";
      await EmailSend(email, EmailText, EmailSubject);
      await userModel.updateOne({ _id: userId }, { $set: { otp: code } });
      return { status: "success", message: "6 digit OTP has been send" };
    }
  } catch (err) {
    return { status: "fail", message: `Email sending failed: ${err.message}` };
  }
};

const verified = async (req, res) => {
  try {
    let email = req.params.email;
    let OTP = req.params.OTP;
    let number = req.headers.numbers;

    // OTP যাচাই করার জন্য ডাটাবেস থেকে ব্যবহারকারী তথ্য অনুসন্ধান করা
    let user = await userModel.findOne({ phoneNumber: number });

    // যদি ব্যবহারকারী না থাকে বা OTP মেল না খায়
    if (!user || user.otp !== OTP) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid OTP or OTP expired" });
    } else {
      const random = () => Math.random().toString(36).substring(2, 10) + number;
      // OTP সফলভাবে যাচাই করার পর, OTP শূন্য এবং verify ফিল্ড আপডেট করা
      await userModel.updateOne(
        { phoneNumber: number }, // ব্যবহারকারীর ফোন নম্বর অনুসারে আপডেট
        { $set: { otp: random(), verify: true, Email: email } },

        { upsert: true } // OTP শূন্য করা এবং verify ফিল্ডকে true করা
      );
    }

    // সফল উত্তর প্রদান
    return { status: "success", message: "Valid OTP, verified successfully" };
  } catch (err) {
    // যদি কোন সমস্যা ঘটে তবে এরর বার্তা
    return { status: "fail", message: ` ${err}` };
  }
};

const ProfileUpdateServices = async (req, res) => {
  try {
    let { NIDNumber } = req.body;
    const ExistingUser = await userModel.findOne({ NIDNumber: NIDNumber });
    if (ExistingUser) {
      let {
        NIDNumber,
        firstName,
        lastName,
        Gender,
        DateOfBirth,
        bloodGroup,
        Email,
        password,
      } = req.body;

      let reqBody = {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        // ...(NIDNumber && { NIDNumber }),
        ...(Gender && { Gender }),
        ...(DateOfBirth && { DateOfBirth }),
        ...(bloodGroup && { bloodGroup }),
        ...(Email && { Email }),
      };
      // If password is provided, hash it and add to reqBody
      if (password) {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        reqBody.password = hashPassword;
      }

      let user_id = req.headers["user_id"];
      await userModel.updateOne({ _id: user_id }, reqBody);
      return { status: "success", message: "Successfully updated user" };
    } else {
      // Return if no user matches the provided NIDNumber
      return {
        status: "fail",
        message: "User not found with the provided Valid NIDNumber",
      };
    }
  } catch (err) {
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err) => err.message);
      return { status: "fail", message: errors.join(", ") };
    }
    return { status: "fail", message: `user not found${err}` };
  }
};

const deleteUserServices = async (req, res) => {
  try {
    let { id } = req.params;
    let user_id = req.headers["user_id"];

    if (id !== user_id) {
      return {
        status: "fail",
        message: "Unauthorized or invalid user",
      };
    }

    let result = await userModel.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      let profile = await profileModel.deleteOne({ UserID: id });
      return { status: "success", message: "Successfully Delete user" };
    } else {
      return { status: "fail", message: "User not found or unauthorized" };
    }
  } catch (err) {
    return { status: "fail", message: `Error deleting user: ${err.message}` };
  }
};

module.exports = {
  registrationServices,
  loginServices,
  SaveProfileService,
  ProfileDetailsReadServices,
  verified,
  GetEmail,
  ProfileUpdateServices,
  deleteUserServices,
};
